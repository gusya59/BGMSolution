const check=module.exports;
var jwt = require('jsonwebtoken');

//get the token from the header
check.getTokenFromHeaders=function(req,res,next){
  //console.log( req.headers['authorization'])
  const bearerHeader = req.headers['authorization'];
  //check if bearer is undefined
  if(bearerHeader.split(' ')[0] !== 'undefined'){
    var bearerToken = bearerHeader.split(' ')[1];
    req.token=bearerToken;
    //return req.token;
    next();
  }else{
    res.status(403).send('problem with token');
    return false;
  }
}  
  
  //verify jwt token
  check.verifyToken=function(token,jwt){
  var verified =jwt.verify(token,'todo-app-super-shared-secret',(err)=>{
    if(err){
        console.log('not verified');
            return false;
    }else{
        console.log('verified')
        return true;
    }
  });
  return verified;
  }

  //decode an email
  check.decodeUserEmail = function(token, jwt){
    var decoded =jwt.decode(token);
    var userEmail = decoded.userID;
    return userEmail;
  }