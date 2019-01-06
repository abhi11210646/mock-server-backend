'use strict';
const response = require('./../../config/response');
const mongoose = require("mongoose");
const Project = mongoose.model('Project');
const projectHelper = require('./project.helper');
module.exports = {
    createProject: async(req, res) => {
        try {
            const project = new Project({
                name: req.body.name,
                user: req.user.id
            });
            project.endpoint = req.protocol + '://' + project._id + '.' + req.hostname;
            await project.save();
            return response.created(res, { data: project, info: 'Successfully Created!' });
        }
        catch (error) {
            return response.error(res, error);
        }
    },
    getProject: async(req, res) => {
        try {
            let projects = [];
            const projectID = req.params['projectID'];
            if (projectID) {
                projects = [await projectHelper.getProject(projectID, req.user.id, true)];
            }
            else {
                projects = await Project.find({ user: req.user.id });
            }
            return response.ok(res, { projects });
        }
        catch (error) {
            return response.error(res, error);
        }
    },
    deleteProject: async(req, res) => {
        try {
            const project = await Project.findByOneAndRemove({ _id: req.body['projectID'], user: req.body.id });
            return response.created(res, { data: project, info: 'Successfully Deleted!' });
        }
        catch (error) {
            return response.error(res, error);
        }
    }
};
