const mongoose = require('mongoose');

const Schema = mongoose.Schema

const peripheralSchema = new Schema({
  UID : {type : Number, required : true},
  vendor : {type : String, required : true},
  dateCreated: {type : Date, required : true},
  status: {type : Boolean, required : true, default: false},
  gateway: {type : String, required : true},
},{
  timestamps:true
})

const peripheral = mongoose.model('peripheral', peripheralSchema)

module.exports = peripheral

