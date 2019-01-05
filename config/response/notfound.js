'use script';

module.exports = (res, error) => {
    return res.status(404).send({
        'status': false,
        'message': error.message,
    });
};
