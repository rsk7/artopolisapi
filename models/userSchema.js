var mongoose = require('mongoose');
 
module.exports = mongoose.model('User',{
    id: String,
    token: String,
    name: String,
    email: String,
    gender: String,
    Age: Number
});