const db = require("../models");
const Chromebook = db.chromebooks;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const serialNumber = req.query.serialNumber;
    var condition = serialNumber ? { serialNumber: { [Op.like]: `%${serialNumber}%` } } : null;

    Chromebook.findAll({ where: condition, include: 'location' })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving chromebooks."
        });
        });
};

exports.findOne = (req, res) => {
    const serialNumber = req.params.serialNumber;

    Chromebook.findByPk(serialNumber, { include: 'location' })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Chromebook with serial number=${serialNumber}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Chromebook with serial number=" + serialNumber
        });
      });
};