'use strict';
const ok = require('./ok');
const error = require('./error');
const unAuthorize = require('./unAuthorize');
const created = require('./created');
const notfound = require('./notfound');
const conflict = require('./conflict');
const badrequest = require('./badrequest');
module.exports = { ok, error, unAuthorize, created, notfound, conflict, badrequest };
