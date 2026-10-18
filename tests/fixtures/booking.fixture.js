import { test as base, expect } from './auth.fixture.js';
import bookingData from '../test-data/booking-data.js';

export const test = base.extend({
    bookingId: async ({ request }, use) => {
        const createResponse = await request.post('booking/', {
            data: {
                ...bookingData
            }
        });
        expect(createResponse.status()).toBe(200);
        const responseBody = await createResponse.json();
        await use(responseBody.bookingid);

    }

});

export { expect };
