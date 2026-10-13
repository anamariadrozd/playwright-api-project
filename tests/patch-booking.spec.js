import { test, expect } from '@playwright/test';
import bookingData from './test-data/booking-data.js';
import validCredentials from './test-data/auth-credentials.js';


test("PATCH partially updates an existing booking", async ({ request }) => {

    // create booking
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


    // patch
    const patchResponse = await request.patch(`booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },
        data: {
            firstname: "John"
        }
    });

    expect(patchResponse.status()).toBe(200);

    const patchBody = await patchResponse.json();

    expect(patchBody.firstname).toBe("John");
    expect(patchBody.lastname).toBe("Brown");
    expect(patchBody.totalprice).toBe(111);
    expect(patchBody.depositpaid).toBe(true);
    expect(patchBody.bookingdates.checkin).toBe("2018-01-01");
    expect(patchBody.bookingdates.checkout).toBe("2019-01-01");
    expect(patchBody.additionalneeds).toBe("Breakfast");
    
});


test("PATCH without token returns 403", async ({ request }) => {

    // create booking
    const createResponse = await request.post("booking/", {
        data: {
            ...bookingData,
        }
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;
    // patch
    const patchResponse = await request.patch(`booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        data: {
            "firstname": "Dean",

        },
    })
    expect(patchResponse.status()).toBe(403);

}); 
