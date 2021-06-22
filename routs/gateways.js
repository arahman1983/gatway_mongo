const GatewaysModel = require("../models/gateways.model");
const PeripheralModel = require("../models/peripheral.model");

const express = require("express");

const router = express.Router();

router.route("/").get((req, res) => {
  GatewaysModel.find()
    .then((gateways) => {
      res.json(
        gateways.map((gateway) => ({
          ...gateway,
          devices: PeripheralModel.find().then((peripherals) => peripherals.filter((peripheral) => String(peripheral.gateway) === String(gateway.serialNo))),
        }))
      );
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  const id = req.params.id;
  GatewaysModel.findById(id)
    .then((gateway) =>
      res.json({
        ...gateway,
        devices: PeripheralModel.find().then((peripherals) => peripherals.filter((peripheral) => String(peripheral.gateway) === String(gateway.serialNo))),
      })
    )
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  const id = req.params.id;
  const serialNo = req.body.serialNo;
  const devices = PeripheralModel.find().then((peripherals) => peripherals.filter((peripheral) => String(peripheral.gateway) === String(serialNo)));
  if (devices.length > 0) {
    return res.status(400).json(`Error: You can't delete this gateway because it is connected with peripheral devices`);
  } else {
    GatewaysModel.findByIdAndRemove(id)
      .then(() => res.json(`Gateway with id: ${id} was removed`))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  }
});

router.route("/update/:id").put((req, res) => {
  const id = req.params.id;
  const newGateway = req.body;
  GatewaysModel.findByIdAndUpdate(id)
    .then((gateway) => {
      gateway.serialNo = newGateway.serialNo;
      gateway.name = newGateway.name;
      gateway.IPv4 = newGateway.IPv4;
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const serialNo = req.body.serialNo;
  const name = req.body.name;
  const IPv4 = req.body.IPv4;
  // const devices = req.body.devices;
  const newGateway = new GatewaysModel({ serialNo, name, IPv4, newGateway });
  newGateway
    .save()
    .then(() => res.json(`New Gateway with IP: ${IPv4} Added`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
