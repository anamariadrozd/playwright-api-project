import bookingData from './test-data/booking-data.js';
import { test, expect } from './fixtures/booking.fixture.js';

test("PUT updates an existing booking", async ({ request, authToken, bookingId }) => {

    const response = await request.put(`booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${authToken}`
        },
        data: {
            firstname: 'Alex',
            lastname: 'Smith',
            totalprice: 250,
            depositpaid: false,
            bookingdates: {
                checkin: '2026-11-01',
                checkout: '2026-11-05'
            },
            additionalneeds: 'Lunch'
        },
    })
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.firstname).toBe("Alex");
    expect(responseBody.lastname).toBe("Smith");
    expect(responseBody.totalprice).toBe(250);
    expect(responseBody.depositpaid).toBe(false);
    expect(responseBody.bookingdates.checkin).toBe("2026-11-01");
    expect(responseBody.bookingdates.checkout).toBe("2026-11-05");
    expect(responseBody.additionalneeds).toBe("Lunch");

});


test("PUT without token returns 403", async ({ request, bookingId }) => {
    const response = await request.put(`booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",

        },
        data: {
            ...bookingData
        },
    })
    expect(response.status()).toBe(403);

});

test("PUT for a non-existing booking returns 405", async ({ request, authToken }) => {

    const response = await request.put("booking/9999999", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${authToken}`
        },
        data: {
            ...bookingData
        },
    })
    expect(response.status()).toBe(405);
});















