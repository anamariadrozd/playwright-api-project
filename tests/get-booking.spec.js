import bookingData from './test-data/booking-data.js';
import { test, expect } from './fixtures/booking.fixture.js';

test("GET/booking returns a valid response", async ({ request, bookingId }) => {


    const response = await request.get("booking");
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    for (const value of responseBody) {
        expect(value).toHaveProperty("bookingid");
        expect(typeof value.bookingid).toBe("number");
    }
    expect(responseBody).toContainEqual({ bookingid: bookingId });

});

test("GET/booking/{id} returns a valid response", async ({ request, bookingId }) => {

    const response = await request.get(`booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).not.toEqual({});
    expect(typeof responseBody).toBe("object");
    expect(responseBody).toHaveProperty("firstname");
    expect(responseBody).toHaveProperty("lastname");
    expect(responseBody).toHaveProperty("totalprice");
    expect(responseBody).toHaveProperty("depositpaid");
    expect(responseBody).toHaveProperty("bookingdates");
    expect(responseBody.bookingdates).toHaveProperty("checkin");
    expect(responseBody.bookingdates).toHaveProperty("checkout");
    expect(typeof responseBody.firstname).toBe("string");
    expect(typeof responseBody.lastname).toBe("string");
    expect(typeof responseBody.totalprice).toBe("number");
    expect(typeof responseBody.depositpaid).toBe("boolean");
    expect(typeof responseBody.bookingdates).toBe("object");
    expect(typeof responseBody.bookingdates.checkin).toBe("string");
    expect(typeof responseBody.bookingdates.checkout).toBe("string");
    expect(responseBody.firstname).toBe("Jim");
    expect(responseBody.lastname).toBe("Brown");
    expect(responseBody.totalprice).toBe(111);
    expect(responseBody.depositpaid).toBe(true);
    expect(responseBody.bookingdates.checkin).toBe("2018-01-01");
    expect(responseBody.bookingdates.checkout).toBe("2019-01-01");
    expect(responseBody.additionalneeds).toBe("Breakfast");
});
test("GET/booking/firsname&lastname filters returns valid booking IDs", async ({ request, bookingId }) => {
   
    const response = await request.get("booking?firstname=Jim&lastname=Brown");
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    for (const value of responseBody) {
        expect(value).toHaveProperty("bookingid");
    }
    expect(responseBody).toContainEqual({ bookingid: bookingId });
});
test("GET/booking/checkin&checkout filters returns valid booking IDs", async ({ request, bookingId }) => {


    const response = await request.get("booking?checkin=2017-12-31&checkout=2020-01-01");
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    for (const value of responseBody) {
        expect(value).toHaveProperty("bookingid");
    }
    expect(responseBody).toContainEqual({ bookingid: bookingId });
});
