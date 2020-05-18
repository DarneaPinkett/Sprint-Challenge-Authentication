const supertest = require("supertest");
const server = require('../api/server');

test("GET/", () => {
    const endpoint = "/"
    const status = 200
    

    expect(res.statusCode).toBe(status)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Welcome to the server!")
})