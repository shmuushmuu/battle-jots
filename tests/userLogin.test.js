const User = require("seeds/userData.js");

test('creates user section', () => {
    const user = new User('Cory', 1234, 'Cory1234@gmail.com');

    expect(user.name).toEqual(expect.any(String));
    expect(user.email).toContain('@');
    expect(user.password).toEqual(expect.any(String));
});
