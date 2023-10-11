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