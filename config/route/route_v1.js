'use strict';
const router = require('express').Router();
const user = require('./../../app/users/user');
const project = require('./../../app/projects/project');
const api = require('./../../app/projects/apis/api');
const isAuthenticated = require("./../middlewares/isAuthenticated");
module.exports = (passport) => {
    // auth
    router.post('/login', user.login);
    router.post('/signUp', user.signUp);

    //projects
    router.post('/createProject', isAuthenticated, project.createProject);
    router.get('/getProject/:projectID?', isAuthenticated, project.getProject);
    router.delete('/deleteProject', isAuthenticated, project.getProject);

    // apis
    router.delete('/deleteApi', isAuthenticated, api.deleteApi);
    router.post('/createApi', isAuthenticated, api.createApi);
    router.get('/getApi/:projectID', isAuthenticated, api.getApi);

    return router;
};
