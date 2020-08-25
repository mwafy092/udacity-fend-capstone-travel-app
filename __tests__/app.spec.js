import { travelAppFunc } from '../src/client/js/app'

// app.js testing

describe("Testing the travelAppFunc() function", () => {
    test('It should return true', () => {
        expect(travelAppFunc).toBeDefined();
    });
});

describe("Testing the travelAppFunc() function", () => {
    test('It should be a function', () => {
        expect(typeof travelAppFunc).toBe('function');
    });
});

