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