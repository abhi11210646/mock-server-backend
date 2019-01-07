'use strict';
const endpoint = require('./../../app/endpoint/apicall');
const rateLimit = require("./../../rateLimiter/rate_limiter");
module.exports = (app, passport) => {
    
    app.use('/api', require('./route_v1')(passport));
    app.get('/', (req, res) => res.status(200).json({ status: "OK" }));
    
    
    //  rateLimit({allowedAttempts: 10,
    //       timeFrame: 10 * 60, // in sec
    //       key: key,
    //       message: 'Too Many Requests. Please try after sometimes!'})
    
    // endpoint for user created apis
    app.all('/*', rateLimit(), endpoint.apiCall);
};
