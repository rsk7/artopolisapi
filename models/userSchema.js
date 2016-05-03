var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	facebook: {
    id: String,
    token: String,
    name: String,
    email: String,
    gender: String,
    age: Number }
});
module.exports = mongoose.model("User", userSchema);