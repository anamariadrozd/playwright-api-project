import {test, expect} from '@playwright/test';
test("GET /ping returns 201", async ({request})  => {
const response= await request.get('/ping');
expect (response.status()).toBe(201);
});