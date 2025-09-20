const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');
const mongoose = require('mongoose');

describe('Auth Endpoints', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    test('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                role: 'user'
            });
        
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });
});