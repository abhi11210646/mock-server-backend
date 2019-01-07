const response = require("./../response");
module.exports = (permission_required) => {
    return  (req, res, next) => {
         
        next();
    //     else {
    //     return response.unAuthorize(res, { message: "No Authorized to perfome this operation!" });
    // }
    };
   
};
