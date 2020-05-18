const supertest = require("supertest");
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(async () => {
    await db('users').truncate()
});
afterAll(async () => {
    await db.destroy()
});

describe('POST / REGISTRATION TESTS', () => {
    it('return status 201', () => {
        return supertest(server).post('/api/auth/register').send({username: 'blueberry', password: 'password'})
        .then(res => {expect(res.status).toBe(201)})
    });
    it('should return JSON', () => {
        return supertest(server).post('/api/auth/register').send({username: 'blueberry', password: 'password'})
        .then(res => {expect(res.type).toMatch(/json/i)})
    })
})

describe ('POST / LOGIN TESTS', () => {
    it('return Welcome ${user.username}', () => {
        return supertest(server).post('/api/auth/login').send({username: 'blueberry', password: 'password'})
        expect(res.body).toEqual('Welcome blueberry')
        expect(res.status).toBe(201)
    })
})

