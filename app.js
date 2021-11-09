require("./db.js");
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const express = require("express");
const session = require('express-session')
const path = require("path")
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model("User");
const app = express();
const ensure = require('connect-ensure-login');
const bodyParser = require('body-parser');

app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 360 * 10000 } 
}));

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "/views"));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, cb) {
        User.findOne({ username: username }, function(err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return cb(null, false, { message: 'Incorrect password.' });
            }
            return cb(null, user);
        });
    }
));

app.get("/", (req, res) => {
    res.render('index');
});


app.post('/register', function(req, res) {
    let newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, newUser){
        if(!err){
            passport.authenticate('local', req, res, function(){
                console.log("created new user %s", req.body.username);
                res.redirect('/dashboard');
            });
        }
    });
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/dashboard');
});

app.get('/dashboard', ensure.ensureLoggedIn(), (req, res) => {
    res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
    and your session expires in ${req.session.cookie.maxAge} 
    milliseconds.<br><br>
    <a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`);
});


const port = process.env.PORT || 3000;

app.listen( port, () => {
    console.log( `Server started on port ${ port }.` );
} );