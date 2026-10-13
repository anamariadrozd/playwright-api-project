import { test, expect } from '@playwright/test';
import bookingData from './test-data/booking-data.js';
import validCredentials from './test-data/auth-credentials.js';

 
// create booking
test("PUT updates an existing booking", async ({ request }) => {
    const createResponse = await request.post("booking/", {
         data: {
            ...bookingData
        }
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;


    // auth
    const authResponse = await request.post("auth", {
        data: {
            ...validCredentials
        }
    });

    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    const token = authBody.token;

    const response = await request.put(`booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
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


test("PUT without token returns 403", async ({ request }) => {
    const createResponse = await request.post("booking/", {
        data: {
            ...bookingData
        }
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;


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

test("PUT for a non-existing booking returns 405", async ({ request }) => {

    const authResponse = await request.post('auth', {
        data: {
            ...validCredentials
        }
    });

    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;
    const response = await request.put("booking/9999999", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },
        data: {
            ...bookingData
        },
    })
    expect(response.status()).toBe(405);
});















