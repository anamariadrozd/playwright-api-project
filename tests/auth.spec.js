import { test, expect } from '@playwright/test';
test("POST /auth returns a valid token", async ({request}) => {

const response=  await request.post('auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });
expect (response.status()).toBe(200);
const responseBody= await response.json();
expect(responseBody).toHaveProperty('token');
expect (typeof responseBody.token).toBe('string');
expect(responseBody.token.length).toBeGreaterThan(0);

});

test("POST /auth with invalid username returns Bad credentials message", async ({request}) => {

const response=  await request.post('auth', {
        data: {
            username: 'admin1',
            password: 'password123'
        }
    });
expect(response.status()).toBe(200);    
const responseBody= await response.json();
expect(responseBody.reason).toBe("Bad credentials");
});

test("POST /auth with invalid password returns Bad credentials message", async ({request}) => {

const response=  await request.post('auth', {
        data: {
            username: 'admin',
            password: 'password1234'
        }
    });
expect(response.status()).toBe(200);    
const responseBody= await response.json();
expect(responseBody.reason).toBe("Bad credentials");
});