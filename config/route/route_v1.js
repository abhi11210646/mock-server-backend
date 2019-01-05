'use strict';
const router = require('express').Router();
const user = require('./../../app/users/user');
const project = require('./../../app/projects/project');
const isAuthenticated = require("./../middlewares/isAuthenticated");
module.exports = (passport) => {
    router.post('/login', user.login);
    router.post('/signUp', user.signUp);
    
    router.post('/createProject', isAuthenticated,  project.createProject);
    router.get('/getProject/:projectID?',isAuthenticated, project.getProject);
    return router;
};
