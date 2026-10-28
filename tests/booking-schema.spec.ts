import { test, expect } from '@playwright/test';
import { createBookingBody } from '../testdata/booking-data';
import { bookingSchema, createBookingResponseSchema } from '../utils/schemas';

test.describe('Schema validation', () => {
  test('POST /booking response matches the schema', async ({ request }) => {
    const response = await request.post('/booking', { data: createBookingBody() });
    expect(response.status()).toBe(200);

    const result = createBookingResponseSchema.safeParse(await response.json());
    expect(result.success, JSON.stringify(result.error?.issues)).toBe(true);
  });

  test('GET /booking/:id response matches the schema', async ({ request }) => {
    const created = await request.post('/booking', { data: createBookingBody() });
    const bookingId = (await created.json()).bookingid;

    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);

    const result = bookingSchema.safeParse(await response.json());
    expect(result.success, JSON.stringify(result.error?.issues)).toBe(true);
  });
});