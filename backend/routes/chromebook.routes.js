module.exports = app => {
    const chromebooks = require("../controllers/chromebook.controller.js");

    var router = require("express").Router();

    // Create a new Chromebook
    // router.post("/", chromebooks.create);

    // Retrieve all
    router.get("/", chromebooks.findAll);

    // Retrieve a single Chromebook with id
    router.get("/:serialNumber", chromebooks.findOne);

    // Update a Chromebook with id
    // router.put("/:id", chromebooks.update);

    app.use('/api/chromebooks', router);
}