const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    password: String,
    watchlists: [Watchlist]
});

const Watchlist = new mongoose.Schema({
    name: String,
    stocks: [Stock]
});

const Stock = new mongoose.Schema({
    ticker: String,
    name: String,
    priceAdded: Number,
    priceNow: Number,
    change: Number,
    description: String
});

mongoose.model('User', User);
mongoose.model('Watchlist', Watchlist);
mongoose.model('Stock', Stock);