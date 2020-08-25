const request = require('supertest');
describe('The page should be running', () => {
    test('Page resonse successfully.', async () => {
        const response = await request('http://localhost:8088').get('/');
        expect(response.statusCode).toBe(200);
    });
});