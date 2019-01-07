'use script';

module.exports = (res, body) => {
    return res.status(409).send({
        'status': false,
        'message': body.message
    });
};
