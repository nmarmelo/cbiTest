const db = require("../models");
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const serialNumber = req.query.serialNumber;
    var condition = serialNumber ? { serialNumber: { [Op.like]: `%${serialNumber}%` } } : null;

    Transaction.findAll({ where: condition, include: { all: true }})
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving transactions."
        });
        });
};