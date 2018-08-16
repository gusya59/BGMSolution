var mongoose = require('mongoose');

var PlatformsSchema = mongoose.Schema({
    answer_id: {type: Schema.Types.ObjectId, ref: 'Answers'},
    //platforms
    platform_type: {type:String, required: true},
    //weight for the budget calculation
    platform_asn_weight: {type:Number, required: true},
  });

//   PlatformsSchema.aggregate([{
//     $lookup:{
//       from: "Answers", //collection name in db to join
//       localField: "answer_id", //field from the input document
//       foreignField: "", //field from the documents of the "from" collection
//       as: "" //output array field
//     }
//   }]).exec(function(err, students) {
//     // students contain WorksnapsTimeEntries
// });


  var PlatformsSchemaExport = module.exports = mongoose.model('Platforms', PlatformsSchema);

