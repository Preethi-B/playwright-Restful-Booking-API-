import { test, expect } from '@playwright/test';
import { createBookingBody } from '../testdata/booking-data';
import { getToken } from '../utils/auth';

test.describe.serial('Booking CRUD flow', () => {
  let bookingId: number;
  let token: string;

  // Created once for the whole flow, new random values on every run
  const postRequestBody = createBookingBody();

  test('1. Get auth token', async ({ request }) => {
  token = await getToken(request);
});

  test('2. Create booking (POST)', async ({ request }) => {
    const response = await request.post('/booking', { data: postRequestBody });
    expect(response.status()).toBe(200);

    const body = await response.json();
    bookingId = body.bookingid;
    expect(bookingId).toBeDefined();
    expect(body.booking.firstname).toBe(postRequestBody.firstname);
    expect(body.booking.lastname).toBe(postRequestBody.lastname);
  });

  test('3. Get booking (GET)', async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe(postRequestBody.firstname);
    expect(body.totalprice).toBe(postRequestBody.totalprice);
    expect(body.bookingdates).toEqual(postRequestBody.bookingdates);
  });

  test('4. Update booking (PUT)', async ({ request }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
      data: { ...postRequestBody, firstname: 'Updated', totalprice: 1500 },
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe('Updated');
    expect(body.totalprice).toBe(1500);
    expect(body.lastname).toBe(postRequestBody.lastname); // unchanged field
  });

  test('5. Delete booking (DELETE)', async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` },
    });
    expect(response.status()).toBe(201);
  });

  test('6. Booking is gone after delete (GET returns 404)', async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(404);
  });

  test('4b. Partially update booking (PATCH)', async ({ request }) => {
  const response = await request.patch(`/booking/${bookingId}`, {
    headers: { Cookie: `token=${token}` },
    data: { firstname: 'Patched', additionalneeds: 'Late checkout' },
  });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.firstname).toBe('Patched');
  expect(body.additionalneeds).toBe('Late checkout');

  // Fields we did NOT send must stay the same as after the PUT
  expect(body.lastname).toBe(postRequestBody.lastname);
  expect(body.totalprice).toBe(1500);
});
});