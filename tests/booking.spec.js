import { test, expect } from "@playwright/test";
test("GET/booking returns a valid response", async ({ request }) => {

    const response = await request.get("booking");
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
    for (const value of responseBody) {
        expect(value).toHaveProperty("bookingid");
    }
});

test("GET/booking/{id} returns a valid response", async ({ request }) => {

    const response = await request.get("booking/5");
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
});
test("GET/booking/firsname&lastname filters returns valid booking IDs", async ({ request }) => {

    const response = await request.get("booking?firstname=James&lastname=Brown");
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    for (const value of responseBody) {
        expect(value).toHaveProperty("bookingid");
    }
});
test("GET/booking/checkin&checkout filters returns valid booking IDs", async ({ request }) => {

    const response = await request.get("booking?checkin=2026-10-11&checkout=2026-10-12");
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    for (const value of responseBody) {
        expect(value).toHaveProperty("bookingid");
    }
});