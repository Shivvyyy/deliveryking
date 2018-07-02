var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  customer: {type:String,required:true},
  customerId: {type: Schema.Types.ObjectId, ref: 'User', required:false},
  total: { type: Number, default: 0},
  items: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: { type: Number},
    price: { type: Number},
    name: {type: String}
  }],
  paymentMethod: {type:String,required:true},
  addressDetails: {type:String,required:true},
  customerContact: {type:String,required:true},
  customerEmail: {type:String,required:true},
  date: {type:String},
  time: {type:String},
  successful: {type:Boolean,required:true}
});


module.exports = mongoose.model('Cart', CartSchema);
