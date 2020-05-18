const supertest = require("supertest");
const server = require('../api/server');

describe('GET/ on server file', () => {
    it('return status 200', async () => {
        const res = await supertest(server).get('/');
        expect(res.status).toBe(200);
    });
    it('return json', async () => {
        const res = await supertest(server).get('/');
        expect(res.type).toBe('application/json');
    })
    it('return Welcome to the server!', async () => {
        const res = await supertest(server).get('/');
        expect(res.body).toEqual('Welcome to the server!')
    })
})