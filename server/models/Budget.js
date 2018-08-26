var mongoose = require('mongoose');

var BudgetSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    user_budget: { type: Number, required: true },
    platforms: {
        type: [{
            platform_id: { type: String, required: true },
            platform_name: { type: String, required: true },
            platform_budget_percent: { type: Number, required: true },
            platform_budget: { type: Number, required: true },
            platform_selected: { type: Number, required: true }, //selected for budget count
        }]
    }
});

var BudgetSchemaExport = module.exports = mongoose.model('Budget', Budget);