const mongoose = require('mongoose');

const Schema = mongoose.Schema

const gatewaysSchema = new Schema({
  serialNo: {type : String, required : true},
  name: {type : String, required : true},
  IPv4: {type : String, required : true},
  devices: {type : [Number], required : true},
},{
  timestamps:true
})

const gateways = mongoose.model('gateways', gatewaysSchema)

module.exports = gateways

