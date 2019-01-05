const mongoose = require("mongoose");
const Project = mongoose.model('Project');
module.exports = {
    getProject: async(pId, userId, lean = false) => {
        if (lean) {
            return await Project.findOne({ _id: pId, user: userId })
                .populate({
                    path: 'apis'
                }).lean();
        }
        else {
            return await Project.findOne({ _id: pId, user: userId })
                .populate({
                    path: 'apis'
                });
        }
    }
};
