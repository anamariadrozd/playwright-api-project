import { test, expect } from './fixtures/booking.fixture.js';

test("DELETE /booking successfully deletes a booking", async ({ request, authToken, bookingId }) => {


    // delete
    const deleteResponse = await request.delete(`booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${authToken}`
        },

    })
    expect(deleteResponse.status()).toBe(201);
});

test("DELETE /booking without token returns 403", async ({ request, bookingId }) => {

    const deleteResponse = await request.delete(`booking/${bookingId}`);

    expect(deleteResponse.status()).toBe(403);
});
