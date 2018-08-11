var mongoose = require('mongoose');

var AnswersSchema = mongoose.Schema({
    answer_text: { type: String, required: true}, //add unique later
    next_question: { type: String, required: true },
    insta_weight: { type: Number, required: true },
    facebook_ads_weight: { type: Number, required: true},
    linkedin_weight: { type: Number, required: true},
    google_search_weight: { type: Number, required: true},
    google_adds_weight: { type: Number, required: true },
  });
  
  var AnswersSchemaExport = module.exports = mongoose.model('Answers', AnswersSchema);