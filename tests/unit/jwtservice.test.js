const jwtService = require("./../../app/services/jwtService");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const env = require('./../../config/environments')
var expect = require('chai').expect
describe('/JWT-Service', () => {
    it('should create valid jwt token', async () => {
        const payload = { id: mongoose.Types.ObjectId(), email: "jonu.1504@gmail.com" }
        const token = await new jwtService().createJwtToken(payload);
        const decoded = jwt.verify(token, env.jwt.secretOrKey);
        expect(decoded.user.email).to.equal(payload.email);
    });
});