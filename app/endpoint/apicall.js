'use strict';
const response = require('./../../config/response');
const mongoose = require("mongoose");
const Api = mongoose.model('Api');
const helper = require('./helper');
module.exports = {
    apiCall: async(req, res) => {
        try {
            const project = req.subdomains[0];
            const api = await Api.findOne({ project: project, "req.method": req.method, "req.path": req.params.path });
            if (api) {
                const response = api.res;
                // const response = {
                //     body: {
                //         status: "OKAYYYYYYYdddddd!!!!"
                //     },
                //     headers: [{ x: 'y' }, { y: 'z' }],
                //     statusCode: 200,
                //     bodyType: 'application/json'
                // };
                res.type(response.bodyType);
                helper.setHeaders(res, response.headers);
                res.status(response.statusCode).send(response.body);
            }
            else {
                response.notfound(res, { message: 'Api path does not exists!' });
            }
        }
        catch (error) {
            return response.error(res, error);
        }
    },

};
