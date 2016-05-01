var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MenuItemSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  ingredients: [String],
  customizations: [String]
});

var MenuSchema = new Schema({
  menuItems: [MenuItemSchema],
  description: String,
  hours: { start: Date, end: Date }
});

mongoose.model("Menu", MenuSchema);
