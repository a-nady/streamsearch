require("./db.js");
const ensure = require('connect-ensure-login');
const mongoose = require("mongoose");
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
const uri = process.env.MONGODB_URI;

if (uri !== undefined) {
    mongoose.connect(uri);
} else {
     // for local use
     mongoose.connect('mongodb://127.0.0.1/contentdb', function() {
         //mongoose.connection.db.dropDatabase();
     })
 }

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
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(obj, done) { done(null, obj); });

//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

let errorFlag = ''

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
        if (errorFlag === '') {
            res.render('login');
        } else {
            res.render('login', {error: errorFlag});
            errorFlag = '';
        }
    }
});

app.get("/errlogin", (req, res) => {
    errorFlag = 'Invalid username or password.';
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
    //console.log(req.session.passport.user)



    Watchlist.find({user : req.session.passport.user.username}, function (err, watch) {
        console.log(watch)
        res.render('dashboard', {user:1, error:errorFlag, list : watch});
        errorFlag = '';
    });

    //User.find(function (err, db) {
    //    if (err) return console.error(err);
    //    console.dir(db);
    //});
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
	res.redirect('/dashboard');
});

app.post("/dashboard", function(req, res) {
    watchlist = req.body.watchlist;
    if (watchlist.length === 0) {
        return res.redirect('/dashboard');
    }
    let found = false;
    Watchlist.findOne({
        user: req.session.passport.user.username,
        name: watchlist
    }, function (err, exists) {
        if (err) {
            console.log(err)
        }
        if (exists) {
            errorFlag = 'Duplicate watchlist.'
            res.redirect('/dashboard')
        } else {
            new Watchlist({
                user: req.session.passport.user.username,
                name: watchlist,
                movies: []
            }).save(function (err, newlist) {

                if (err) {
                    console.log(err);
                }
                req.session.passport.user.watchlists.push(newlist);

                User.findOneAndUpdate({ user : req.session.passport.user.username }, { $set: {
                    watchlists : req.session.passport.user.watchlists } }, { new: true }, function(err, doc) {
                    if (err) {
                        console.log(err);
                    }
                    //console.log(doc)
                });
                res.redirect('/dashboard');
            });
        }
    })
});

const port = process.env.PORT || 3000;


//User.remove({}, function(err) {
//    console.log('removed')
//});

//Watchlist.remove({}, function(err) {
//    console.log('removed')
//});

//User.remove({}, function(err) {
//    console.log('removed')
//});


function iterate(id) {
    i = 0

}


app.listen(port, () => {
    console.log( `Server started on port ${port}.` );
});

