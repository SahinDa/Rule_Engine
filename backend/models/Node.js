const mongoose = require('mongoose');

// Define the Node schema
const NodeSchema = new mongoose.Schema({
    type: { type: String, required: true },  // "operator" or "operand"
    left: { type: mongoose.Schema.Types.Mixed },  // Left node for operators
    right: { type: mongoose.Schema.Types.Mixed },  // Right node for operators
    value: { type: String }  // Value for conditions or operator type (AND/OR)
});

// Create and export the model
module.exports = mongoose.model('Node', NodeSchema);
