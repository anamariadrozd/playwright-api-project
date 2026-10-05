import { test, expect } from '@playwright/test';
test("PATCH partially updates an existing booking", async ({ request }) => {

    // create booking
    const createResponse = await request.post("booking/", {
        data: {
            firstname: "John",
            lastname: "Black",
            totalprice: 500,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-02-03",
                checkout: "2026-03-04"
            },
            additionalneeds: "Lunch and dinner"
        }
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;


    // auth
    const authResponse = await request.post("auth", {
        data: {
            username: "admin",
            password: "password123"
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
    expect(patchBody.lastname).toBe("Black");
});


test("PATCH without token returns 403", async ({ request }) => {

    // create booking
    const createResponse = await request.post("booking/", {
        data: {
            firstname: "Jim",
            lastname: "Clarkson",
            totalprice: 200,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-02-03",
                checkout: "2026-03-04"
            },
            additionalneeds: "Lunch and dinner"
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
