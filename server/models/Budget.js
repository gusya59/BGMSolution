var mongoose = require('mongoose');

var BudgetSchema = mongoose.Schema({
    user_email: { type: String, required: true },
    user_budget: { type: Number, required: true },
    platforms_budget: {
        type: [{
            platform_id: { type: String, required: true },
            platform_name: { type: String, required: true },
            platform_budget_percent: { type: Number, required: true },
            platform_budget: { type: Number, required: true },
        }]
    },
    created: { type: Date, default: Date.now() }
});

var BudgetSchemaExport = module.exports = mongoose.model('Budget', BudgetSchema);

//create Budget scheme in the db
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

  module.exports.calculateLength = async function (data){
    var length = this.aggregate(
        [{$match: {_id: "5b8a6b93f0c044093081fa40"}},
      {$project:{user_email: 1, amount: {$size: "$user_budget"}}} ])


    console.log(length.schema);
    // if (length) {
    //   return length;
    // }
    // else {
    //   return false
    // }
  }
  //