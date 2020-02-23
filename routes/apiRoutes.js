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
        console.log(notesArray.length);

        var loc = 0;

        for (let i = 0; i < notesArray.length; i++) {
            if (notesArray[i].id == req.params.id) {
                console.log(notes[i]);
                loc = i;
                console.log(loc);
            }
        }
        notesArray.splice(loc, 1);

        fs.writeFile("db/db.json", JSON.stringify(notesArray), function (err){
            if (err) {
                console.log(err)
            }
        })
    });
};
