var mongoose = require('mongoose');
var AnswersSchema = require('../models/Answers')
var Schema = mongoose.Schema;

var QuestionSchema = mongoose.Schema({
    question_id: {type: String, unique: true},
    question_text: { type: String, required: true}, //add unique later
    //answers:{type:[], required:true}
    answers:[{type: Schema.Types.ObjectId, ref: AnswersSchema}]

  });
  
  var QuestionSchemaExport = module.exports = mongoose.model('Question', QuestionSchema);

  //find question in the db by id
  //input: question_id
  //output: question object if found, else false.
  module.exports.findQuestionById = async function (data){
    var found = await QuestionSchemaExport.findOne({question_id: data})
    if(found){
      return found;
    }
    else{
      return false;
    }
  };

  //add question
  //input: question text
  //output: question object on sucess or false
  module.exports.createQuestion = async function (datap){
    try{
      var created =await datap.save()(function (err) {
        if (err) return handleError(err);
      
        var story1 = new AnswersSchema(datap.answers);
      
        story1.save(function (err) {
          if (err) return handleError(err);
          // thats it!
        });
      })


      if(created){
        return created;
      }
      else{
        return false;
      }
    }catch(err){
      throw new Error ('cant delete a question')
    } 
    };
  //delete question
  //input: question id
  //output: true on sucess or false
  module.exports.deleteQuestion = async function (data){
    try{
      var removed = await UsersSchemaExport.findOneAndDelete({question_id: data })
      if(removed){
        console.log(removed);
        return removed;
      }
      else{
        console.log("cant insert "+removed);
        return false;
      }
    } catch(err){
      throw new Error ('cant delete a question')
    } 
  }
    //delete question
  //input: question id
  //output: true on sucess or false
  module.exports.changeQuestion = async function (nquestion_id,updateData, nquestion_text){
    try{
      var removed = await UsersSchemaExport.findOneAndUpdate({ question_id: nquestion_id }, updateData, { question_text:nquestion_text })
      if(removed){
        console.log(removed);
        return removed;
      }
      else{
        console.log("cant insert "+removed);
        return false;
      }
    } catch(err){
      throw new Error ('cant change question');
    } 
  }
