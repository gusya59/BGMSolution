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

//find the platforms_ budget array of the specific user and calculte it's size - gets the amount of platforms 
//input: user's email
//output: the size on success, else undefind. 
module.exports.calculateLength = async function (user_email) {
  console.log();
  var result = (await this.aggregate([
    { "$match": { "user_email": user_email } },
    { '$sort': { 'created': -1 } }, //sort by the date. from the newest to oldest
    { "$project": { "count": { "$size": "$platforms_budget" } } }
  ])).map(({ count }) => count)
  if (result) {
    return result[0]
  } else {
    return false
  }
}

//update platform_budgent_percent (percentage to invest)in the schema
//input: user'e email, plftform name, data to update with
//output: true on success, else false
module.exports.updateBudgetPercent = async function (user_email, platform_name, p_budget) {
  var query = {
    "user_email": user_email,
    "platforms_budget": {
      $elemMatch: { "platform_name": platform_name }
    }
  };
  //the location that need to be updated
  var update = { "$set": { "platforms_budget.$[outer].platform_budget_percent": p_budget } };
  //array's index
  var options = { arrayFilters: [{ "outer.platform_name": platform_name }] };
  var updated = await this.findOneAndUpdate(query, update, options).sort({ created: -1 })
  if (updated) { //if the data was updated
    return true;
  } else {
    return false;
  }
}

//update platform_budgent(budget to invest)in the schema
//input: user'e email, plftform name, data to update with
//output: true on success, else false
module.exports.updateBudget = async function (user_email, platform_name, p_budget) {
  var query = {
    "user_email": user_email,
    "platforms_budget": {
      $elemMatch: { "platform_name": platform_name }
    }
  };
  //the location that need to be updated
  var update = { "$set": { "platforms_budget.$[outer].platform_budget": p_budget } };
  //array's index
  var options = { arrayFilters: [{ "outer.platform_name": platform_name }] };
  var updated = await this.findOneAndUpdate(query, update, options).sort({ created: -1 })
  if (updated) { //if the data was updated
    return updated;
  } else {
    return false;
  }
}

//find the newest (last) user's budget. 
//input: user's email
//output: user's budget on success, else false. 
module.exports.findNewestUserBudget = async function (user_email) {
  var result = await this.findOne({ user_email: user_email }).sort({ created: -1 }).limit(1)
  if (result) {
    return result.user_budget
  } else {
    return false
  }
}

//fetch user's latest budget distribution
//input: user's email
//output: budget distribution that contains platforms names and budgets on success, else false. 
module.exports.fetchBudgetData = async function (user_email) {
  var result = await this.findOne({ user_email: user_email }).sort({ created: -1 }).limit(1)
  if (result) {
    return result;
  } else {
    return false
  }
}