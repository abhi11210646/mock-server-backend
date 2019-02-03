const jwtService = require("./../../app/services/jwtService");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const env = require('./../../config/environments')
describe('/JWT-Service', () => {
    it('should create valid jwt token', async () => {
        const payload = { id: mongoose.Types.ObjectId(), email: "jonu.1504@gmail.com" }
        const token = await new jwtService().createJwtToken(payload);
        const decoded = jwt.verify(token, env.jwt.secretOrKey);
        expect(decoded.user.email).toBe(payload.email);
    });
});