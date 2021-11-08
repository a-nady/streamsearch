require("./db.js");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path")

const app = express();
//const Movie = mongoose.model("User");
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 3000;
app.listen( port, () => {
    console.log( `Server started on port ${ port }.` );
} );