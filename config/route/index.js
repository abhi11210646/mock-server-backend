'use strict';
const endpoint = require('./../../app/endpoint/apicall');
module.exports = (app, passport) => {
    app.use('/api', require('./route_v1')(passport));
    app.get('/', (req, res) => res.status(200).json({ status: "OK" }));
    // endpoint for user created apis
    app.all('/*', endpoint.apiCall);
};
