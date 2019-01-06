'use strict';
const response = require('./../../../config/response');
const mongoose = require("mongoose");
const Api = mongoose.model('Api');
const Project = mongoose.model('Project');
module.exports = {
    createApi: async(req, res) => {
        try {
            let api = new Api();
            api.req = req.body.req;
            api.res = req.body.res;
            api.project = req.body.projectId;
            await api.save();
            await Project.update({ _id: req.body.projectId }, { $push: { "apis": api._id } });
            return response.created(res, { data: api, info: 'Successfully Created!' });
        }
        catch (error) {
            return response.error(res, error);
        }
    },
    deleteApi: async(req, res) => {
        try {
            if (req.user.id !== req.body['user']) return response.unAuthorize(res, { message: 'Unauthorize operation!' });
            const apis = await Api.findByIdAndRemove(req.body['apiID']);
            return response.ok(res, { apis });
        }
        catch (error) {
            return response.error(res, error);
        }
    },
    getApi: async(req, res) => {
        try {
            const apis = await Api.find({ project: req.params['projectID'] });
            return response.ok(res, { apis });
        }
        catch (error) {
            return response.error(res, error);
        }
    }

};
