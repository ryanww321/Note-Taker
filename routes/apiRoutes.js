const fs = require("fs")
const util = require("util");

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

module.exports = function (app) {

    // array for the notes being input
    let notesArray = require("../db/db.json");

    app.get("/api/notes", function (err, res) {

        res.json(notesArray);
    });

    // writes the note to the json file
    app.post("/api/notes", function (req, res) {

        console.log("NOTESDATA:", req.body);

        notesArray.push(JSON.stringify(req.body));

        fs.writeFile("db/db.json", notesArray, function (err) {
            if (err) {
                console.log(err)
            }
            console.log("Written!")


        });
    });

    // deletes a note
    app.delete("/api/notes/:id", function (req, res) {
        try {

            notesArray = notesArray.filter(function (note) {
                return note.id != req.params.id;
            });

            fs.writeFile("db/db.json", JSON.stringify(notesArray), "utf8", function (err) {
                if (err) throw err;
            });

            res.json({ ok: true });

        } catch (err) {
            throw err;
            console.log(err);
        }
    });
};
