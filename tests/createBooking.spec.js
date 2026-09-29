import { test, expect } from '@playwright/test';
test("POST /booking successfully creates a booking", async ({ request }) => {

    const response = await request.post('booking/', {
        data: {
            "firstname": "Jim",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }
    });
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(typeof responseBody).toBe("object");
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

test("POST /booking accepts empty input values", async ({ request }) => {

    const response = await request.post('booking/', {
        data: {
            "firstname": "",
            "lastname": "",
            "totalprice":"" ,
            "depositpaid": false,
            "bookingdates": {
                "checkin": "",
                "checkout": ""
            },
            "additionalneeds": ""
        }
    });
    expect(response.status()).toBe(200);
})

