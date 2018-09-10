var mongoose = require('mongoose');
var PlatformsSchema = require('../models/Platforms')
//selected platform's db scheme
var SelectedPlatformsSchema = mongoose.Schema({
  user_email: { type: String, required: true },
  //digital media platforms
  platforms: {
    type: [{
      platform_id: { type: String, required: true },
      platform_name: { type: String, required: true },
      platform_selected: { type: Boolean, required: true },
    }]
  },
  created: { type: Date, default: Date.now() }
});


var SelectedPlatformsSchemaExport = module.exports = mongoose.model('SelectedPlatforms', SelectedPlatformsSchema);

//create selected platform scheme in the db
//input:  user id and selected platform's data
//output: data on success, else false
module.exports.inputData = async function (userEmail) {
  //  find the amount of platforms
  var platformsAmount = await PlatformsSchema.calculateLength();
  //find the newest (last) platforms. 
  var latestPlatforms = await PlatformsSchema.findNewestPlatforms()
  var platformsArray = []

  //fetch the relevant data: platform id and name and create those platforms data in the budget schema
  for (var i = 0; i < platformsAmount; i++) {
    var platformObj = {
      platform_id: "ppp",
      platform_name: "ppp",
      platform_weight: 0
    }
    //update parametrs
    platformObj.platform_id = latestPlatforms.platforms[i].platform_id;
    platformObj.platform_name = latestPlatforms.platforms[i].platform_name;
    platformObj.platform_selected = "true";

    platformsArray.push(platformObj);
  }
  var newDB = new SelectedPlatformsSchemaExport();
  newDB.user_email = userEmail;
  newDB.platforms = platformsArray;
  var created = await newDB.save();
  if (created) {
    return created;
  }
  else {
    return false
  }
}

//fetch the first platform
//input: user's id
//output: user's data on success, else false
module.exports.fetchSPData = async function (data) {
  var found = await this.findOne({});
  if (found) { //if the data was found
    return found;
  } else {
    return false;
  }
}

//fetch user selected platform data from the db 
//input: user's id
//output: user's data on success, else false
module.exports.fetchSelectedPlatformsData = async function (data) {
  var found = await this.findOne({ "user_email": data.user_email });
  if (found) { //if the data was found
    return found;
  } else {
    return false;
  }
}

//finf specific user and updata it's selectedplatform data
//input: user's id, platforms data
//output: user's data on success, else false
module.exports.updatePlatformSelection = async function (data) {
  var found = await this.findOneAndUpdate({ "user_email": data.user_email }, { $set: { platforms: data.platforms } }).sort({ created: -1 });
  if (found) { //if the data was updated
    return found;
  } else {
    return false;
  }
}

//check if the specific platform has been selected for budget calculations
//input: user's email, platform's name
//output: if was choosen - true, else false
module.exports.fetchPlatformSelected = async function (email, name) {
  var found = await this.findOne({ "user_email": email }, { platforms: { $elemMatch: { platform_name: name } } }).sort({ created: -1 }).limit(1);
  if (found.platforms[0].platform_selected) { // if was selected
    return true
  } else {
    return false
  }
}
