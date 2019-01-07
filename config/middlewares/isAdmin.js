const response = require("./../response");
module.exports = (req, res, next) => {
    if (req.user.role === 'ADMIN') {
        next();
    }
    else {
        return response.unAuthorize(res, { message: "No Authorized to perfome this operation!" });
    }
};
