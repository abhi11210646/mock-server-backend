'use strict';
const response = require('./../../config/response');
const mongoose = require("mongoose");
const Api = mongoose.model('Api');
const helper = require('./helper');
module.exports = {
    apiCall: async(req, res) => {
        try {
            const project = req.subdomains[0];
            const api = await Api.findOne({ project: project, "req.method": req.method, "req.path": req.url });
            if (api) {
                const response = api.res;
                res.type(response.bodyType);
                if (response.bodyType === 'application/json') {
                    try {
                        response.body = JSON.parse(response.body);
                    }
                    catch (e) {
                        response.body = { data: response.body };
                    }
                }
                helper.setHeaders(res, response.headers);
                // rate limiter middelware set this function
                if (req.rateLimit) {
                    const remaining = await req.rateLimit();
                    res.setHeader('X-Rate-Limit-Remaining', remaining);
                }
                res.status(response.statusCode).send(response.body);
            }
            else {
                response.notfound(res, { message: 'Api path does not exists!' });
            }
        }
        catch (error) {
            if (error.name === 'CastError') {
                return response.notfound(res, { message: 'EndPoint does not exists!' });
            }
            return response.error(res, error);
        }
    },

};
