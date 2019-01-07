'use script';

module.exports = (res, body) => {
    return res.status(400).send({
        'status': false,
        'message': body.message
    });
};
