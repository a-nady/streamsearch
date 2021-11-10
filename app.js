require("./db.js");
const ensure = require('connect-ensure-login');
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const express = require("express");
const session = require('express-session')
const path = require("path");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const bodyParser = require('body-parser');
const User = mongoose.model("User");
const Watchlist = mongoose.model("Watchlist");
const Movie = mongoose.model("Movie");

app.use(session({
    secret: 'cryingemoji',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 360 * 10000 } 
}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "/views"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let errorMessage = ''

app.get("/", (req, res) => {
    if (req.user) {
        res.redirect('/dashboard')
    } else {
        res.render('index');
    }
});

app.get("/login", (req, res) => {
    if (req.user) {
        res.redirect('/dashboard')
    } else {
        if (errorMessage === '') {
            res.render('login');
        } else {
            res.render('login', {error: errorMessage});
            errorMessage = '';
        }
    }
});

app.get("/errlogin", (req, res) => {
    errorMessage = 'Invalid username or password.';
    res.redirect('/login')
});

app.get("/register", (req, res) => {
    if (req.user) {
        res.redirect('/dashboard')
    } else {
        res.render('register');
    }
});

app.get('/dashboard', ensure.ensureLoggedIn(), (req, res) => {
    if (errorMessage === '') {
        res.render('dashboard', {user:1});
    } else {
        res.render('dashboard', {user:1, error:errorMessage});
        errorMessage = '';
    }

    User.find(function (err, db) {
        if (err) return console.error(err);
        console.dir(db);
    });
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

app.post("/register", function(req, res) {
    username = req.body.username;
    password = req.body.password;

    if (password.length < 8) {
        console.log("Password too short");
        return res.render("register", {error : "Password must be at least 8 characters."});
    }
    else {
        User.register(new User({username: username}), password, function(err, user){
            if(err){
                console.log(err)
                let str = 'Something went wrong';
                if ('UserExistsError' === err.name) {
                    str = 'Username already in use.';
                }
                return res.render("register", {error : str});
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/dashboard");
            });
        });
    }

});

app.post('/login', passport.authenticate('local', { failureRedirect: '/errlogin' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/dashboard');
});

app.post("/dashboard", function(req, res) {

    watchlist = req.body.watchlist;
    if (watchlist.length === 0) {
        return res.redirect('/dashboard');
    }
    let found = false;
    Watchlist.findOne({
        name: watchlist
    }, function (err, exists) {
        if (err) {
            console.log(err)
        }
        if (exists) {
            res.render('dashboard', {error: 'Duplicate watchlist.'});
        } else {
            new Watchlist({
                name: watchlist,
                movies: []
            }).save(function (err, movie) {
                if (err) {
                    console.log(err);
                }
                console.log('yes')
                // console.log(movie);
                res.redirect('/dashboard');
            });
        }
    })
});

const port = process.env.PORT || 3000;

//User.remove({}, function(err) {
//    console.log('removed')
//});

app.listen( port, () => {
    console.log( `Server started on port ${ port }.` );
} );

