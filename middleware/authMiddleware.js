const jwt = require("jsonwebtoken");
const User = require("../models/user");

//check for login
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(200).json({"message":"failed to login"});
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(200).json({"message":"failed to login"});
}

  next();
};


//check for current user

const checkUser = ( req, res , next ) => {

  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'secret', async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }

};


module.exports = { requireAuth,checkUser }; 