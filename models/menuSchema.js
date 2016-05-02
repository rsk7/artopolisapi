var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MenuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  ingredients: [String],
  customizations: [String]
});

var MenuSchema = new Schema({
  menuItems: { type: [MenuItemSchema], required: true },
  description: String,
  hours: { 
    start: { type: Date, required: true }, 
    end: { type: Date, required: true }
  }
});

mongoose.model("Menu", MenuSchema);
