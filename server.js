const express = require("express");
const app = express();
const apiRoutes = require("./routes/apiRoutes")(app);
const htmlRoutes = require("./routes/htmlRoutes")(app);
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// app.use("/api", apiRoutes)
// app.use("/", htmlRoutes)


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});


