var mongoose = require('mongoose');

var ShoppingSchema = new mongoose.Schema({
  name: String,
  price: Number,
  url: String,
  orders: Number
});

ShoppingSchema.methods.order = function(cb) {
  this.orders += 1;
  this.save(cb);
};

mongoose.model('Shopping',ShoppingSchema);