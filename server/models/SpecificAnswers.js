var mongoose = require('mongoose');

var SpecificAnswersSchema = mongoose.Schema({
    spec_user_id: { type: String, required: true},
    spec_question_text: { type: [], required: true}, 
    spec_answer_text: { type: [], required: true}, 
 
    // spec_insta_weight_budget: { type: Number, required: true },
    // spec_facebook_weight_budget: { type: Number, required: true},
    // spec_facebook_ads_weight_budget: { type: Number, required: true},
    // spec_google_mybusiness_weight_budget: { type: Number, required: true},
    // spec_google_search_weight_budget: { type: Number, required: true},
    // spec_google_adds_weight_budget: { type: Number, required: true },
  });
  
  var SpecificAnswersSchemaExport = module.exports = mongoose.model('SpecificAnswers', SpecificAnswers);