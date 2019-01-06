const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const response = require('./../../config/response');
module.exports = {
    assignProject: async(req, res) => {
        try {
            const projectId = req.body.projectID;
            const user = req.body.user;
            await Project.update({ _id: projectId }, { $set: { user: user } });
            response.ok(res, { message: 'Successfully transferred!' });
        }
        catch (error) {
            return response.error(res, error);
        }
    }
};
