var mongoose = require('mongoose');

var PlatformsSchema = mongoose.Schema({
    platforms: {
        type: [{
          platform_id: { type: String, required: true },
          platform_name: { type: String, required: true },
          platform_weight: { type: Number, required: true },
        }]
      },
  created: { type: Date, default: Date.now() }
});

var PlatformsSchemaExport = module.exports = mongoose.model('Platforms', PlatformsSchema);

//create Platforms schema in the db
//input:  relevant data
//output: data on success, else false
module.exports.inputData = async function (data) {
    var created = await data.save();
    if (created) {
      return created;
    }
    else {
      return false
    }
  }

//calculate the amount of platforms in the latest schema
//input: none
//output: the size on success, else undefind. 
module.exports.calculateLength = async function () {
    var result = (await this.aggregate([
      { '$sort': { 'created': -1 } }, //sort by the date. from the newest to oldest
      { "$project": { "count": { "$size": "$platforms" } } }
    ])).map(({ count }) => count)
    if (result) {
      return result[0]
    } else {
      return false
    }
  }

//find the newest (last) platforms. 
//input: none
//output: platforms data on success, else false. 
module.exports.findNewestPlatforms = async function () {
    var result = await this.findOne().sort({ created: -1 }).limit(1)
    if (result) {
      return result
    } else {
      return false
    }
  }