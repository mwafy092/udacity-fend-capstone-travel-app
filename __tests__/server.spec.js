const request = require('supertest');
describe('The page should be running', () => {
    test('Page response successfully.', async () => {
        const response = await request('http://localhost:3033').get('/');
        expect(response.statusCode).toBe(200);
    });
});