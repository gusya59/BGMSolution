var express = require('express');
//var router = express.Router();
var router =express();

var registrationSchema = require('../models/Registration.js');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   console.log(registrat);
// });

// Defined store route
router.route('/next').post (function(req,res){
  var registerData = new registrationSchema(req.body);
  registerData.save().then(item=>{
    res.status(200).json({'registerData': 'data added successfully'});
  })
  .catch(err => {
    res.status(400).send("unable to save to database");
    });
  })

  // Defined get data(index or listing) route
router.route('/').get(function (req, res) {
  console.log(req.body);
  registrationSchema.find(function (err, data){
   if(err){
     console.log(err);
   }
   else {
     res.json(data);
     }
   });
});

//registration
router.route('/signup').post (async function (req, res) {
  
  //to add validation?

  //create new user
  var newUser = new registrationSchema(req.body);
  console.log('req.body');
  var isCreated = await registrationSchema.inputData(newUser).then(result =>{
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
