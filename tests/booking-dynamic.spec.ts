import { test, expect } from '@playwright/test';
import { createBookingBody } from '../testdata/booking-data.ts';

test('Create booking with dynamic data', async ({ request }) => {
  const postRequestBody = createBookingBody();

  const response = await request.post('/booking', { data: postRequestBody });
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.bookingid).toBeDefined();

  // Prove the API saved exactly what we sent
  expect(body.booking.firstname).toBe(postRequestBody.firstname);
  expect(body.booking.lastname).toBe(postRequestBody.lastname);
  expect(body.booking.totalprice).toBe(postRequestBody.totalprice);
  expect(body.booking.depositpaid).toBe(postRequestBody.depositpaid);
  expect(body.booking.bookingdates).toEqual(postRequestBody.bookingdates);

  console.log('Sent: ' + JSON.stringify(postRequestBody));
});