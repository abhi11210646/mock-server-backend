'use strict';
const response = require('./../../config/response');
const passport = require('passport');
const jwtService = require("./../services/jwtService");
const mongoose = require("mongoose");
const User = mongoose.model('User');
module.exports = {
    // login controller
    login: (req, res) => {
        passport.authenticate('local', async (err, user, info) => {
            if (err) { return response.error(res, err); }
            if (!user) { return response.unAuthorize(res, info); }
            let token = await new jwtService().createJwtToken({ id: user._id, email: user.username });
            response.ok(res, token);
        })(req, res);
    },
    signUp: async(req, res) => {
        try {
            let user = new User({ username: req.body.username, password: req.body.password });
            user.password = user.encryptPassword(req.body.password);
            await user.save();
            let token = await new jwtService().createJwtToken({ id: user._id, email: user.username });
            return response.created(res, { data:token, info: 'Successfully Registered!' });
        }
        catch (error) {
            return response.error(res, error);
        }
    }

};
