var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
    question_text: { type: String, required: true}, //add unique later
    answers:{type:[], required:true}

  });
  
  var QuestionSchemaExport = module.exports = mongoose.model('Question', QuestionSchema);