const app = require("../src/server/index");
// test the main app endpoint
// note: city is waiting to be entered due to async js
test('app', () => {
    expect(app).toBeDefined();
});
