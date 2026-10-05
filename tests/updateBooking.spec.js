import { test, expect } from '@playwright/test';
// create booking
test("PUT updates an existing booking", async ({ request }) => {
    const createResponse = await request.post("booking/", {
        data: {
            firstname: "Linda",
            lastname: "Black",
            totalprice: 500,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-03-03",
                checkout: "2026-05-04"
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

    const response = await request.put(`booking/${bookingId}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },
        data: {
            "firstname": "John",
            "lastname": "Wilson",
            "totalprice": 939,
            "depositpaid": false,
            "bookingdates": {
                "checkin": "2024-09-20",
                "checkout": "2026-06-24"
            },
            "additionalneeds": "Dinner"

        },
    })
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.firstname).toBe("John");
    expect(responseBody.lastname).toBe("Wilson");
    expect(responseBody.totalprice).toBe(939);
    expect(responseBody.depositpaid).toBe(false);
    expect(responseBody.bookingdates.checkin).toBe("2024-09-20");
    expect(responseBody.bookingdates.checkout).toBe("2026-06-24");
    expect(responseBody.additionalneeds).toBe("Dinner");

});


test("PUT without token returns 403", async ({ request }) => {
    const createResponse = await request.post("booking/", {
        data: {
            firstname: "Jane",
            lastname: "Connor",
            totalprice: 500,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-03-03",
                checkout: "2026-05-04"
            },
            additionalneeds: "Lunch and dinner"
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
            "firstname": "John",
            "lastname": "Wilson",
            "totalprice": 939,
            "depositpaid": false,
            "bookingdates": {
                "checkin": "2024-09-20",
                "checkout": "2026-06-24"
            },
            "additionalneeds": "Dinner"

        },
    })
    expect(response.status()).toBe(403);

});

test("PUT for a non-existing booking returns 405", async ({ request }) => {

    const authResponse = await request.post('auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;
    const response = await request.put("booking/9999", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },
        data: {
            "firstname": "John",
            "lastname": "Wilson",
            "totalprice": 939,
            "depositpaid": false,
            "bookingdates": {
                "checkin": "2024-09-20",
                "checkout": "2026-06-24"
            },
            "additionalneeds": "Dinner"

        },
    })
    expect(response.status()).toBe(405);
});















