import { test, expect } from './fixtures/booking.fixture.js';
import { requestHeaders } from './helpers/request-headers.js';

test("DELETE /booking successfully deletes a booking", async ({ request, authToken, bookingId }) => {

    const deleteResponse = await request.delete(`booking/${bookingId}`, {
        headers: requestHeaders(authToken),

    })
    expect(deleteResponse.status()).toBe(201);
});

test("DELETE /booking without token returns 403", async ({ request, bookingId }) => {

    const deleteResponse = await request.delete(`booking/${bookingId}`);

    expect(deleteResponse.status()).toBe(403);
});
