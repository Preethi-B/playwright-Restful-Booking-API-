import { z } from 'zod';

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'must be YYYY-MM-DD');

// The booking itself (what GET returns, and what is inside POST's "booking")
export const bookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: z.object({
    checkin: dateString,
    checkout: dateString,
  }),
  additionalneeds: z.string().optional(),
});

// What POST /booking returns
export const createBookingResponseSchema = z.object({
  bookingid: z.number(),
  booking: bookingSchema,
});