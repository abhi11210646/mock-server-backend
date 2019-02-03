'use strict';
const response = require('./../../../config/response');
const mongoose = require("mongoose");
const Api = mongoose.model('Api');
const Project = mongoose.model('Project');
module.exports = {
    createApi: async(req, res) => {
        try {
            if (Object.keys(req.body.req).length && req.body.project && Object.keys(req.body.res).length) {
                
                const _api = await Api.findOne({ project: req.body.project, 'req.method': req.body.req.method, 'req.path': req.body.req.path });
                if (_api) return response.conflict(res, { message: 'Api Already exists!' });
                
                let api = new Api();
                api.req = req.body.req;
                api.res = req.body.res;
                api.res.body = JSON.stringify(req.body.res.body);
                api.project = req.body.project;
                await api.save();
                await Project.update({ _id: req.body.project }, { $push: { "apis": api._id } });
                return response.created(res, { data: api, info: 'Successfully Created!' });
            }
            else {
                return response.badrequest(res, { message: 'Invalid Input' });
            }
        }
        catch (error) {
            return response.error(res, error);
        }
    },
    deleteApi: async(req, res) => {
        try {
            if (req.user.id !== req.body['user']) return response.unAuthorize(res, { message: 'Unauthorize operation!' });
            await Api.remove({ _id: req.body['apiID'] });
            return response.ok(res, { message: "Api deleted!" });
        }
        catch (error) {
            return response.error(res, error);
        }
    },
    getApis: async(req, res) => {
        try {
            const apis = await Api.find({ project: req.params['projectID'] });
            return response.ok(res, { apis });
        }
        catch (error) {
            return response.error(res, error);
        }
    }

};
