var mongoose = require('mongoose');
// var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: {type: String, required: true},
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: false},
  prodDesc: {type: String, required: true},
  prodImg: {type: String, required: true},
  serve: {type: Number, required: true},
  vegPrice: {type: String, required: true},
  nonVegPrice: {type: String, required: true},
  mainSection1: {type:Boolean, required: false},
  mainSection2: {type:Boolean, required: false}
});

// ProductSchema.plugin(mongoosastic, {
//   hosts: [
//     'localhost:9200'
//   ]
// });

module.exports = mongoose.model('Product', ProductSchema);
