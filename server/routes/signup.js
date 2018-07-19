var express = require('express');
//var router = express.Router();
var router =express();

var registrationSchema = require('../models/Registration.js');


// Defined get data(index or listing) route
// router.route('/').get(function (req, res) {
//   console.log(req.body);
//   registrationSchema.find(function (err, data){
//    if(err){
//      console.log(err);
//    }
//    else {
//      res.json(data);
//      }
//    });
// });

//registration
router.post('/registration', function (req, res) {
  
  console.log(req.body)
  // res.status(200).send('bla bla bla bla bla bla')
  res.status(200)
  //to add validation? yes!
//  console.log(req.body);
//   //create new user
  var newUser = new registrationSchema(req.body);
  //console.log(newUser);
  var isCreated = registrationSchema.inputData(newUser).then(result =>{  
    if (result)
    {
      console.log(isCreated);
      res.status(200).send({success:true,message:"User Created!"})
    }
    else
      console.log(err);
  }) 
})

//login
router.route('/login'), async function (req, res){

}


module.exports = router;
