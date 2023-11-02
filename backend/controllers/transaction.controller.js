const db = require("../models");
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: trans } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, trans, totalPages, currentPage };
  };
  
  
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

exports.findAllDateDesc = (req, res) => {
    const serialNumber = req.query.serialNumber;
    var condition = serialNumber ? { serialNumber: { [Op.like]: `%${serialNumber}%` } } : null;

    Transaction.findAll({ where: condition, include: { all: true }, limit: 10, order: [['DATETIME', 'DESC']]})
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

exports.findAndCountAllDateDesc = (req, res) => {
    const serialNumber = req.query.serialNumber;
    const page = req.query.page;
    const size = req.query.size;
    const { limit, offset } = getPagination(page, size);

    var condition = serialNumber ? { serialNumber: { [Op.like]: `%${serialNumber}%` } } : null;

    Transaction.findAndCountAll({ 
        where: condition, limit, offset,
        include: { all: true }, 
        order: [['DATETIME', 'DESC']]})
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving transactions."
    });
    });
};

exports.create = (req, res) => {
    Transaction.create( req.body )
    .then(data => {
        const response = data;
        res.send(response);
    })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while creating a transaction."
    });
    });
};