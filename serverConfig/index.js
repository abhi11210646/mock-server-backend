require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./../config/db');
const environments = require('./../config/environments');
const passportStrategy = require('./../config/passport');
module.exports = (app, passport) => {
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(cors());
    passportStrategy(passport);
    dbConfig(environments);
};
