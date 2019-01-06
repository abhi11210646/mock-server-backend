'use strict';
const router = require('express').Router();
const user = require('./../../app/users/user');
const project = require('./../../app/projects/project');
const api = require('./../../app/projects/apis/api');
const isAuthenticated = require("./../middlewares/isAuthenticated");
const isAdmin = require("./../middlewares/isAdmin");
const admin = require('./../../app/admin/admin');
module.exports = (passport) => {
    // auth
    router.post('/login', user.login);
    router.post('/signUp', user.signUp);

    //projects
    router.post('/createProject', isAuthenticated, project.createProject);
    router.get('/getProject/:projectID?', isAuthenticated, project.getProject);
    router.delete('/deleteProject', isAuthenticated, project.deleteProject);

    // apis
    router.post('/createApi', isAuthenticated, api.createApi);
    router.get('/getApis/:projectID', isAuthenticated, api.getApis);
    router.delete('/deleteApi', isAuthenticated, api.deleteApi);

    //admin task
    router.post('/assignProject', isAuthenticated, isAdmin, admin.assignProject);

    return router;
};
