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

mongoose.model("User", userSchema);