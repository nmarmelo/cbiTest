module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");

    var router = require("express").Router();

    router.get("/", transactions.findAll);

    app.use('/api/transactions', router);
}