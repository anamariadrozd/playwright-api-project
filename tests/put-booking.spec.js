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
            ...bookingData
        },
    })
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.firstname).toBe("Jim");
    expect(responseBody.lastname).toBe("Brown");
    expect(responseBody.totalprice).toBe(111);
    expect(responseBody.depositpaid).toBe(true);
    expect(responseBody.bookingdates.checkin).toBe("2018-01-01");
    expect(responseBody.bookingdates.checkout).toBe("2019-01-01");
    expect(responseBody.additionalneeds).toBe("Breakfast");

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















