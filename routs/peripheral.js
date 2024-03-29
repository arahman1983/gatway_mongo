const PeripheralModel = require('../models/peripheral.model');
const express = require('express');
const router = express.Router();

router.route("/").get((req, res) => {
  PeripheralModel.find()
    .then((peripherals) => res.json(peripherals))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/count").get((req, res) => {
  PeripheralModel.find()
    .then((peripherals) => res.json(peripherals.length))
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
  const status = req.body.status
  const gateway = req.body.gateway
  
  PeripheralModel
    .findByIdAndUpdate({_id: id},{$set:
      {
        vendor,
        status,
        gateway
      }
    })
      .then((docs) =>res.json(docs))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});


router.route("/add").post((req, res) => {
  const UID = req.body.UID
  const vendor = req.body.vendor
  const status = req.body.status
  const gateway = req.body.gateway
  
  const newDevice = new PeripheralModel({ UID, vendor, status, gateway });
  newDevice
    .save()
    .then(() => res.json(`New Device added to the gateway ${gateway} Added`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});


module.exports = router;
