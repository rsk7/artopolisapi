var mongoose = require("mongoose"):
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  restaurantId: Schema.Types.ObjectId,
  menuItemId: Schema.Types.ObjectId,
  totalPrice: Number
  status: { 
    type: String, 
    enum: ["paid", "notpaid"], 
    default: "notpaid"
  }
});

mongoose.model("Order", OrderSchema);