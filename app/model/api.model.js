'use strict';

const mongoose = require('mongoose');
const apiSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    req: {
        method: {
            type: String,
            enum: ['GET', 'POST', 'DELETE', 'PUT'],
            default: 'GET'
        },
        path: {
            type: String,
            trim: true
        }
    },
    res: {
        body: {
            type: String,
            default: 'No Data'
        },
        headers: [],
        statusCode: {
            type: Number,
            default: 200
        },
        bodyType: {
            type: String,
            enum: ['text/plain', 'text/html', 'application/json', 'image/png'],
            default: 'application/json'
        }
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Api', apiSchema);
