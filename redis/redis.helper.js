'use strict';
const redisClient = require('./index');
const util = require('util');
const incrAsync = util.promisify(redisClient.incr);
const getAsync = util.promisify(redisClient.get);
const expireAsync = util.promisify(redisClient.expire);
module.exports = {
    for: (key) => {
        const increase = () => {
            return incrAsync(key);
        };
        const get = () => {
            return getAsync(key);
        };
        const expire = (time) => {
            return expireAsync(key, time);
        };
        return { increase, expire, get };
    },
    isStoreActive: () => {
        return redisClient.connected;
    }
};
