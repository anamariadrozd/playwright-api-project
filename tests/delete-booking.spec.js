import { test, expect } from '@playwright/test';
import bookingData from './test-data/booking-data.js';
import validCredentials from './test-data/auth-credentials.js';


test("DELETE /booking successfully deletes a booking", async ({ request }) => {
    //create booking
    const createResponse = await request.post('booking/', {
        data: {
            ...bookingData
        }
    });
    const responseBody = await createResponse.json();
    const bookingid = responseBody.bookingid;
    expect(createResponse.status()).toBe(200);

    //auth

    const authResponse = await request.post('auth', {
        data: {
            ...validCredentials
        }
    });

    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;
    expect(authResponse.status()).toBe(200);
    // delete
    const deleteResponse = await request.delete(`booking/${bookingid}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },

    })
    expect(deleteResponse.status()).toBe(201);
});

test("DELETE /booking without token returns 403", async ({ request }) => {
    const createResponse = await request.post('booking/', {
        data: {
            ...bookingData
        }
    });
    expect(createResponse.status()).toBe(200);

    const { bookingid } = await createResponse.json();
    const deleteResponse = await request.delete(`booking/${bookingid}`);

    expect(deleteResponse.status()).toBe(403);
});
