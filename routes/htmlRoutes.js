const path = require("path");

module.exports = function (app) {

    // the get request from the website when the button is clicked
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // default route
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));

    })


};