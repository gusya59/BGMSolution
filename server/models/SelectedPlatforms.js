var mongoose = require('mongoose');

//selected platform's db scheme
var SelectedPlatformsSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    //digital media platforms
    platforms: {
        type: [{
            platform_id: { type: String, required: true },
            platform_name: { type: String, required: true },
            platform_selected: { type: Boolean, required: true },
        }]
    }
});


var SelectedPlatformsSchemaExport = module.exports = mongoose.model('SelectedPlatforms', SelectedPlatformsSchema);

//create selected platform scheme in the db
//input:  user id and selected platform's data
//output: data on success, else false
module.exports.inputData = async function (data) {
    var created = await data.save();
    if(ctreated){
      return created;
    }
    else{
      return false
    }   
}

//fetch user selected platform data from the db 
//input: user's id
//output: user's data on success, else false
module.exports.fetchSelectedPlatformsData = async function (data) {
    var found = await this.findOne({ "user_id": data.user_id});
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
    var found = await this.findOneAndUpdate({ "user_id": data.user_id}, {$set:{ platforms: data.platforms}});
    if (found) { //if the data was updated
      return found;
    } else {
      return false;
    }
  }