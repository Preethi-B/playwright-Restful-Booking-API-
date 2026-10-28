import { faker } from '@faker-js/faker';

// Returns YYYY-MM-DD for today + a number of days
function dateInDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function createBookingBody() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 2000 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: dateInDays(1),
      checkout: dateInDays(4),
    },
    additionalneeds: faker.helpers.arrayElement(['Breakfast', 'Dinner', 'Parking']),
  };
}