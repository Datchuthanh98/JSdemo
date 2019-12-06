var mongoose = require('mongoose');

// category Schema
var DeviceSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    
});

var User = module.exports = mongoose.model('User', DeviceSchema);

