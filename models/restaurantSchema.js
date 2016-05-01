var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
	name: { type: String },
	location: { type: String },
	menus: [Schema.Types.ObjectId]
});

mongoose.model("Restaurant", RestaurantSchema);
