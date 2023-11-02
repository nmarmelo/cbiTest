module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");

    var router = require("express").Router();

    router.get("/", transactions.findAll);

    router.get("/byDate", transactions.findAllDateDesc);

    router.get("/byDatePaginated", transactions.findAndCountAllDateDesc);

    router.post("/create", transactions.create);

    app.use('/api/transactions', router);
}