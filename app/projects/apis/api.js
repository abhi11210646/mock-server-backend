'use strict';
const response = require('./../../../config/response');
const mongoose = require("mongoose");
const Api = mongoose.model('Api');
// const projectHelper = require('./api.helper');
module.exports = {
    createApi: async (req, res) => {
        try {
            const api = await Api.create(req.body);
            return response.created(res, { data:api, info: 'Successfully Created!' });
        }
        catch (error) {
            return response.error(res, error);
        }
    },
    getApi: async (req, res) => {
        try {
            const apis = await Api.find({ project: req.param('projectID') });
            return response.ok(res, { apis });
        }
        catch (error) {
            return response.error(res, error);
        }
    }

};
