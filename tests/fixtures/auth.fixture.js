import { test as base, expect } from '@playwright/test';
import validCredentials from '../test-data/auth-credentials.js';

export const test = base.extend({
    authToken: async ({ request }, use) => {
        const authResponse = await request.post("auth", {
            data: {
                ...validCredentials
            }
        });

        expect(authResponse.status()).toBe(200);

        const authBody = await authResponse.json();
        await use(authBody.token);

    }

});

export { expect };
