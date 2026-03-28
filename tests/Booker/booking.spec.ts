import { test, expect } from '@playwright/test';
import { z } from 'zod';

const bookingIdsSchema = z.array(z.object({
    bookingid: z.number(),
}));

const bookingSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    totalprice: z.number(),
    depositpaid: z.boolean(),
    bookingdates: z.object({  
        checkin: z.string(),
        checkout: z.string(),
    }),
    additionalneeds: z.string().optional(),
}); 

test("GET all bookings", async ({request}) => {
   const response = await request.get('https://restful-booker.herokuapp.com/booking');
   expect(response.status()).toBe(200);
   console.log(await response.json());
   // verify that the response is an array of objects like [{bookingid: number}]
    const bookings = await response.json();
    expect(() => bookingIdsSchema.parse(bookings)).not.toThrow();
  
});

test("GET booking by ID", async ({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking/1');
    expect(response.status()).toBe(200);
    const booking = await response.json();
    console.log(booking);
    expect(() => bookingSchema.parse(booking)).not.toThrow();
});

const newBookingSchema = z.object({
    bookingid: z.number(),
    booking: bookingSchema,
});
test("POST create a new booking", async ({request}) => {
    const newBookingPayload = {
        firstname: "John",
        lastname: "Doe",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-04-01",
            checkout: "2026-04-10"
        },
        additionalneeds: "Breakfast"
    };

    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: newBookingPayload
    });

    expect(response.status()).toBe(200);
    const createBookingResponse = await response.json();
    expect(() => newBookingSchema.parse(createBookingResponse)).not.toThrow();
    const { booking } = createBookingResponse;
    expect(booking).toMatchObject(newBookingPayload);
});

test("PUT update a booking", async ({request}) => {
    // get token
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });
    expect(authResponse.status()).toBe(200);
    const authData = await authResponse.json();
    const token = authData.token;

    const updatedBookingPayload = {
        firstname: "Jane",
        lastname: "Smith",
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
            checkin: "2026-05-01",
            checkout: "2026-05-10"
        },
        additionalneeds: "Late checkout"
    };

    const response = await request.put('https://restful-booker.herokuapp.com/booking/1', {
        data: updatedBookingPayload,
        headers: {'Cookie': `token=${token}`}   
    });

    expect(response.status()).toBe(200);
    const updatedBookingResponse = await response.json();
    console.log(updatedBookingResponse);
    expect(updatedBookingResponse).toMatchObject(updatedBookingPayload);
});

test("partial update a booking with PATCH", async ({request}) => {
    // get token
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        } 
    });
    expect(authResponse.status()).toBe(200);
    const authData = await authResponse.json();
    const token = authData.token;

    const partialUpdatePayload = {
        firstname: "Jane",
        lastname: "Smith",
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-04-01",
            checkout: "2026-04-10"
        },
        additionalneeds: "Lunch"
    };

    //list all bookings to get the random booking id
    const bookingsResponse = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(bookingsResponse.status()).toBe(200);
    const bookings = await bookingsResponse.json();
    const randomBooking = bookings[Math.floor(Math.random() * bookings.length)];
    const bookingId = randomBooking.bookingid;
 
    const response = await request.patch(`https://restful-booker.herokuapp.com/booking/${bookingId}`, {
        data: partialUpdatePayload,
        headers: {'Cookie': `token=${token}`}   
    }); 
    expect(response.status()).toBe(200);
    const updatedBooking = await response.json();
    console.log(updatedBooking);
    expect(updatedBooking).toMatchObject(partialUpdatePayload);

});
test("DELETE a booking", async ({request}) => {
    // First create a booking to delete
    const newBookingPayload = {
        firstname: "ToDelete",
        lastname: "User",
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-04-01",
            checkout: "2026-04-10"
        },
        additionalneeds: "None"
    };

    const createResponse = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: newBookingPayload
    });
    expect(createResponse.status()).toBe(200);
    const { bookingid } = await createResponse.json();

    // get token
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });
    expect(authResponse.status()).toBe(200);
    const authData = await authResponse.json();
    const token = authData.token;

    // Delete the booking
    const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        headers: {'Cookie': `token=${token}`}
    });
    expect(response.status()).toBe(201);
    
    // verify that the booking is deleted by trying to get it again
    const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`);
    expect(getResponse.status()).toBe(404);
});