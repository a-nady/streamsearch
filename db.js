const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const Movie = new mongoose.Schema({
  	// title of the movie
    title: String,
  	// since some content is on multiple services, schematype should be an array here
    service: [String],
    dateReleased: Number,
    description: String,
  	// if user watched it or not
    watched: Boolean
});

const Watchlist = new mongoose.Schema({
  	// name of the watch list as well as an array of all the content being stored by the user in that watchlist
    user : String,
    name: String,
    movies: [Movie]
    },
    {
        timestamps: true
    });

const User = new mongoose.Schema({
  	// store user information
    username: String,
    password: String,
    watchlists: [Watchlist],
  	// watchlist will contain a list of seperate lists of movies/tv
});

User.plugin(passportLocalMongoose);

mongoose.model('User', User);
mongoose.model('Watchlist', Watchlist);
mongoose.model('Movie', Movie);
//mongoose.connect('mongodb://localhost/contentdb');
//mongoose.connect('mongodb://127.0.0.1/contentdb')

