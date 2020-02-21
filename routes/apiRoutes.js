const fs = require("fs");

module.exports = function(app) {

// array for the notes being input
let notesData = [];

app.get("/api/notes", function (err, res) {
    try {
        notesData = fs.readFileSync("../../db/db.json", "utf8");
        notesData = JSON.parse(notesData);
    }
    catch (err) {
        console.log(err);
    }
    res.json(notesData);
});

// writes the note to the json file
app.post("/api/notes", function (req, res) {
    try {
        notesData = fs.readFileSync("../../db/db.json", "utf8");
        console.log(notesData);

        notesData = JSON.parse(notesData);
        req.body.id = notesData.length;
        notesData.push(req.body);
        notesData.JSON.stringify(notesData);

        fs.writeFile("../../db/db.json", notesData, "utf8", function (err) {
            if (err) throw err;
        });

        res.json(JSON.parse(notesData));

    } catch (err) {
        throw err;
        console.log(err);
    }
});

// deletes a note
app.delete("/api/notes/:id", function (req, res) {
    try {
        notesData = fs.readFileSync("../../db/db.json", "utf8");
        notesData = JSON.parse(notesData);
        notesData = notesData.filter(function (note) {
            return note.id != req.params.id;
        });

        notesData = JSON.stringify(notesData);
        fs.writeFile("../../db/db.json", notesData, "utf8", function (err) {
            if (err) throw err;
        });

    } catch (err) {
        throw err;
        console.log(err);
    }
});
};
