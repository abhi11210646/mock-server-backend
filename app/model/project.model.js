'use strict';

const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
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
module.exports = mongoose.model('Project', projectSchema);
