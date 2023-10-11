module.exports = app => {
    const chromebooks = require("../controllers/chromebook.controller.js");

    var router = require("express").Router();

    router.get("/", chromebooks.findAll);

    app.use('/api/chromebooks', router);
}