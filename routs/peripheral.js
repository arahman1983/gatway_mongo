const PeripheralModel = require('../models/peripheral.model');
const express = require('express');
const router = express.Router();

router.route("/").get((req, res) => {
  PeripheralModel.find()
    .then((peripherals) => res.json(peripherals))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  PeripheralModel.findById(id)
    .then((peripheral) => res.json(peripheral))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});


router.route("/:id").delete((req, res) => {
  const id = req.params.id;
  PeripheralModel.findByIdAndRemove(id)
    .then(() => res.json(`Gateway with id: ${id} was removed`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});



router.route("/update/:id").put((req, res) => {
  const id = req.params.id
  const vendor = req.body.vendor
  const dateCreated = req.body.dateCreated
  const status = req.body.status
  const gateway = req.body.gateway
  
  PeripheralModel
    .findByIdAndUpdate(id)
    .then((device) => {
      device.vendor = vendor
      device.dateCreated = dateCreated
      device.status = status
      device.gateway = gateway
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});


router.route("/add").post((req, res) => {

  const vendor = req.body.vendor
  const dateCreated = req.body.dateCreated
  const status = req.body.status
  const gateway = req.body.gateway
  
  const newDevice = new GatewaysModel({ vendor, dateCreated, status, gateway });
  newDevice
    .save()
    .then(() => res.json(`New Device added to the gateway ${gateway} Added`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});


module.exports = router;
