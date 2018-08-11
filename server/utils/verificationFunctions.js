const check=module.exports;


//get the token from the header
check.getTokenFromHeaders=function(req,res,next){
  // console.log( req.headers['authorization'])
  const bearerHeader = req.headers['authorization'];
  //check if bearer is undefined
  if(bearerHeader.split(' ')[0] !== 'undefined'){
    var bearerToken = bearerHeader.split(' ')[1];
    req.token=bearerToken;
    next();
  }else{
    res.status(403).send('problem with token');
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