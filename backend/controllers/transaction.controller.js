const db = require("../models");
const Transaction = db.transactions;
//const Location = db.locations;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { serialNumber: { [Op.like]: `%${id}%` } } : null;

    Transaction.findAll({ include: { all: true }})
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