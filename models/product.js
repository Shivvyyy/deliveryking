var mongoose = require('mongoose');
// var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: {type: String, required: true},
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true},
  prodItemDesc: {type: String, required: true},
  prodDesc: {type: String, required: true},
  prodImg: {type: String, required: true},
  serve: {type: Number, required: true},
  price: {type: Number, required: true},
  fullPrice: {type: Number, required: false},
  nonVeg: {type: Boolean, required: true},
  veg: {type: Boolean, required: true},
  mainSection1: {type:Boolean, required: false},
  mainSection2: {type:Boolean, required: false}
});

// ProductSchema.plugin(mongoosastic, {
//   hosts: [
//     'localhost:9200'
//   ]
// });

module.exports = mongoose.model('Product', ProductSchema);
