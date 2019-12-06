var mongoose = require('mongoose');

// Page Schema
var PageSchema = mongoose.Schema({
   
    title: {
        type: String,
        required: true
    },
    total: {
        type: String
    },
    totalimg: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    sorting: {
        type: Number
    }
    
});

var New = module.exports = mongoose.model('New', PageSchema);

