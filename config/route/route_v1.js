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
    router.post('/project', isAuthenticated, project.createProject);
    router.get('/project/:projectID?', isAuthenticated, project.getProject);
    router.delete('/project', isAuthenticated, project.deleteProject);

    // apis
    router.post('/api', isAuthenticated, api.createApi);
    router.get('/api/:projectID', isAuthenticated, api.getApis);
    router.delete('/api', isAuthenticated, api.deleteApi);

    //admin task
    router.post('/assignProject', isAuthenticated, isAdmin, admin.assignProject);

    return router;
};
