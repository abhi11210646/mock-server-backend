'use strict';

const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    endpoint: {
        type: String,
        default: ""
    },
    apis: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Api'
    }]
}, {
    timestamps: true
});
projectSchema.pre('remove', function (next) {
    let Api = mongoose.model('Api');
    Api.find({ _id: { $in: this.apis } }).remove(() => { });
    return next();
});
module.exports = mongoose.model('Project', projectSchema);
