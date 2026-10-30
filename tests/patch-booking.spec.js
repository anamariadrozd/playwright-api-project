import { test, expect } from './fixtures/booking.fixture.js';
import { requestHeaders } from './helpers/request-headers.js';

test("PATCH partially updates an existing booking", async ({ request, authToken, bookingId}) => {

    const patchResponse = await request.patch(`booking/${bookingId}`, {
        headers: requestHeaders(authToken),
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


test("PATCH without token returns 403", async ({ request, bookingId }) => {

    const patchResponse = await request.patch(`booking/${bookingId}`, {
        headers: requestHeaders(),
        data: {
            "firstname": "Dean",

        },
    })
    expect(patchResponse.status()).toBe(403);

}); 
