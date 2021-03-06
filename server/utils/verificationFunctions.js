const check = module.exports;
var jwt = require('jsonwebtoken');

//get the token from the header
//input: header
//output: on success go to the next function, else false
check.getTokenFromHeaders = function (req, res, next) {
  const bearerHeader = req.headers['authorization'];
  //check if bearer is undefined
  if (bearerHeader.split(' ')[0] !== 'undefined') {
    var bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    //return req.token;
    next();
    // res.redirect();
  } else {
    res.status(403).send('problem with token');
    return false;
  }
}

//verify jwt token
//input: token, jwt
//on sucess: true, else false
check.verifyToken = function (token, jwt) {
  var verified = jwt.verify(token, 'todo-app-super-shared-secret', (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
  return verified;
}

//decode an email
//input: token data, jwt library data
//output: user's email.
check.decodeUserEmail = function (token, jwt) {
  var decoded = jwt.decode(token);
  var userEmail = decoded.userID;
  return userEmail;
}

//decode an isAdmin
//input: token data, jwt library data
//output: isAdmin parametr data. true if admin, else false
check.decodeisAdmin = function (token, jwt) {
  var decoded = jwt.decode(token);
  var isAdmin = decoded.isAdmin;
  return isAdmin;
}