import bookingData from './test-data/booking-data.js'; 
import { test, expect } from '@playwright/test';


test("POST /booking successfully creates a booking", async ({ request }) => {

    const response = await request.post('booking/', {
        data: {
            ...bookingData
        }
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("bookingid");
    expect(typeof responseBody.bookingid).toBe("number");

    expect(responseBody.booking.firstname).toBe("Jim");
    expect(responseBody.booking.lastname).toBe("Brown");
    expect(responseBody.booking.totalprice).toBe(111);
    expect(responseBody.booking.depositpaid).toBe(true);
    expect(responseBody.booking.bookingdates.checkin).toBe("2018-01-01");
    expect(responseBody.booking.bookingdates.checkout).toBe("2019-01-01");
    expect(responseBody.booking.additionalneeds).toBe("Breakfast");

});

test("POST /booking creates a booking without optional additionalneeds", async ({ request }) => {
    const { additionalneeds, ...bookingWithoutNeeds } = bookingData;

    const response = await request.post('booking/', {
        data: {
            ...bookingWithoutNeeds
        }
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("bookingid");
    expect(typeof responseBody.bookingid).toBe("number");

    expect(responseBody.booking.firstname).toBe("Jim");
    expect(responseBody.booking.lastname).toBe("Brown");
    expect(responseBody.booking.totalprice).toBe(111);
    expect(responseBody.booking.depositpaid).toBe(true);
    expect(responseBody.booking.bookingdates.checkin).toBe("2018-01-01");
    expect(responseBody.booking.bookingdates.checkout).toBe("2019-01-01");
    expect(responseBody.booking.additionalneeds).toBeUndefined();

})
