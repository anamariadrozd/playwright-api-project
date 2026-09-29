import { test, expect } from '@playwright/test';
test("PATCH partially updates an existing booking", async ({ request }) => {

    const authResponse = await request.post('auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    const authResponseBody = await authResponse.json();
    const token = authResponseBody.token;
    const response = await request.patch("booking/4", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `token=${token}`
        },
        data: {
            "firstname": "Dean",
            "lastname": "Monroe",
        },
    })
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(typeof responseBody).toBe("object");

    expect(responseBody.firstname).toBe("Dean");
    expect(responseBody.lastname).toBe("Monroe");

}); 


test("PATCH without token returns 403", async ({ request }) => {


    const response = await request.patch("booking/4", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        data: {
            "firstname": "Dean",
            "lastname": "Monroe",
        },
    })
    expect(response.status()).toBe(403);

}); 
