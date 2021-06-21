const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const gateways = require('./routs/gateways');
const peripheral = require('./routs/peripheral');

dotenv.config()

const app = express()
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex : true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open',()=>{
  console.log("Mongo Connected")
})

app.use(cors())
app.use(express.json())

app.use('/gateways', gateways)
app.use('/peripheral', peripheral)

app.listen(port, ()=>{
  console.log('server is running')
})