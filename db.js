const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Movie = new mongoose.Schema({
    wl_id: String,
    id: Number,
    title: String,
    type: String,
    services: [String],
    release: Number,
    description: String,
    actors: [String],
    watched: Boolean,
});

const Watchlist = new mongoose.Schema(
    {
        user: String,
        name: String,
        movies: [Movie],
    },
    {
        timestamps: true,
    }
);

const User = new mongoose.Schema({
    username: String,
    password: String,
    watchlists: [Watchlist],
});

User.plugin(passportLocalMongoose);

mongoose.model("User", User);
mongoose.model("Watchlist", Watchlist);
mongoose.model("Movie", Movie);