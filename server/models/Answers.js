var mongoose = require('mongoose');


var AnswersSchema = mongoose.Schema({
    answer_id: {type: String, unique: true},
    answer_text: { type: String, required: true}, //add unique later
    next_question: { type: String, required: true },
  });
  
  var AnswersSchemaExport = module.exports = mongoose.model('Answers', AnswersSchema);

  //find answer in the db by id
  //input: answe_id
  //output: answe object if found, else false.
  module.exports.findAnswerById = async function (data){
    var found = await AnswersSchemaExport.findOne({question_id: data})
    if(found){
      return found;
    }
    else{
      return false;
    }
  }

  //change secific answer
  //input: ans_id, parametr to update, new parametr data
  //output:
  module.exports.changeAnswerParametr = async function(ans_id, updateData, newData){
    try{
     var changed = await AnswersSchemaExport.findOneAndUpdate({answer_id:ans_id}, updateData,{ new: newData })
      if(changed){
        console.log(changed);
        return changed;
      }
      else{
        console.log("cant insert "+change);
        return false;
      }
    } catch(err){
      throw new Error ('cant change data');
    } 
  }
