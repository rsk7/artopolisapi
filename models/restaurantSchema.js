var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  menus: [Schema.Types.ObjectId]
});

mongoose.model("Restaurant", RestaurantSchema);

