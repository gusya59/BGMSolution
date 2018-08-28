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
    }
});

var BudgetSchemaExport = module.exports = mongoose.model('Budget', Budget);