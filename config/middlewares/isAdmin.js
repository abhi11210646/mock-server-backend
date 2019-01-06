module.exports = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
     next();
   }else {
     return res.status(401).send({ status: false, message: "No Authorized to perfome this operation!" });
   }
};
