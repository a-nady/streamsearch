const mongoose = require('mongoose');

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
    name: String,
    movies: [Movie]
});

const User = new mongoose.Schema({
  	// store user information
    username: String,
    password: String,
  	// watchlist will contain a list of seperate lists of movies/tv
    watchlists: [Watchlist]
});

mongoose.model('User', User);
mongoose.model('Watchlist', Watchlist);
mongoose.model('Movie', Movie);
mongoose.connect('mongodb://localhost/contentdb');