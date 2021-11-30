require("./db.js");
const jw = require("./lookup");
const ensure = require("connect-ensure-login");
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const bodyParser = require("body-parser");
const User = mongoose.model("User");
const Watchlist = mongoose.model("Watchlist");
const Movie = mongoose.model("Movie");
const uri = process.env.MONGODB_URI;
const reactViews = require('express-react-views');

if (uri !== undefined) {
    mongoose.connect(uri);
} else {
    // for local use
    mongoose.connect("mongodb://127.0.0.1/contentdb", function () {
        //mongoose.connection.db.dropDatabase();
    });
}

app.use(
    session({
        secret: "cryingemoji",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 360 * 10000 },
    })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

let errorFlag = "";
let successFlag = "";

app.get("/", (req, res) => {
    if (req.user) {
        res.redirect("/dashboard");
    } else {
        res.render("index");
    }
});



app.get("/login", (req, res) => {
    if (req.user) {
        res.redirect("/dashboard");
    } else {
        res.render("login", { error: errorFlag });
        errorFlag = "";
    }
});

app.get("/errlogin", (req, res) => {
    errorFlag = "Invalid username or password.";
    res.redirect("/login");
});

app.get("/register", (req, res) => {
    if (req.user) {
        res.redirect("/dashboard");
    } else {
        res.render("register");
    }
});

app.get("/dashboard", ensure.ensureLoggedIn(), function (req, res) {
    Watchlist.find(
        { user: req.session.passport.user.username },
        function (err, watch) {
            res.render("dashboard", {
                error: errorFlag,
                success: successFlag,
                list: watch,
            });
            errorFlag = "";
            successFlag = "";
        }
    ).sort({
        updatedAt: -1 //Sort by Date Added DESC
    });
});

app.get("/dashboard/:wlist", ensure.ensureLoggedIn(), function (req, res) {
    req.session.passport.user.currlist = req.params.wlist;
    Watchlist.findOne(
        { user: req.session.passport.user.username, name: req.params.wlist },
        function (err, watch) {
            if (err) {
                console.log(err);
                errorFlag = "An error occured";
                return res.redirect("/dashboard");
            }
            Movie.find({ wl_id: watch._id }, function (err, movs) {
                if (err) {
                    console.log(err);
                    errorFlag = "An error occured";
                    return res.redirect("/dashboard");
                }
                res.render("movies", {
                    wlistName: watch.name,
                    list: movs,
                });
                errorFlag = "";
                successFlag = "";
            });
        }
    );
});

app.get("/dashboard/:wlist/search/:query", ensure.ensureLoggedIn(), async function (req, res) {
    req.session.passport.user.results = await jw.search(req.params.query);
    res.render("results", {
            error: errorFlag,
            list: req.session.passport.user.results,
        });
    }
);

app.get("/dashboard/add/:index", ensure.ensureLoggedIn(), async function (req, res) {
        let mov = req.session.passport.user.results[req.params.index];
        // didnt do this during searching to prevent too many api requests
        let desc = await jw.getDesc(mov.type, mov.id);
        Watchlist.findOne(
            {
                user: req.session.passport.user.username,
                name: req.session.passport.user.currlist,
            },
            function (err, watch) {
                if (err) {
                    console.log(err);
                    errorFlag = "An error occured";
                    return res.redirect("/dashboard");
                }
                Movie.findOne({ id: mov.id, wl_id: watch._id }, function (err, exists) {
                    if (err) {
                        console.log(err);
                        errorFlag = "An error occured";
                    } else if (exists) {
                        errorFlag = "Movie is already in this list.";
                    } else {
                        new Movie({
                            wl_id: watch._id,
                            id: mov.id,
                            title: mov.title,
                            release: mov.release,
                            type: mov.type,
                            services: mov.services.slice(),
                            description: desc,
                            watched: false,
                        }).save(function (err, newMov) {
                            if (err) {
                                console.log(err);
                            }
                            Watchlist.findOneAndUpdate(
                                {
                                    user: req.session.passport.user.username,
                                    name: req.session.passport.user.currlist,
                                },
                                {
                                    $push: {
                                        movies: newMov,
                                    },
                                },
                                function (err, doc) {
                                    if (err) {
                                        console.log(err);
                                    }
                                }
                            );
                            successFlag = newMov.title + " successfully added";
                        });
                    }
                });
            }
        );
        res.redirect("/dashboard/" + req.session.passport.user.currlist);
        delete req.session.passport.user.currlist;
        delete req.session.passport.user.results;
    }
);

app.get("/search", (req, res) => {
    if (req.user) {
        res.render("search", { loggedIn: true})
    } else {
        res.render("search", { loggedIn: false });
    }
});

app.get("/search/:query", async function (req, res) {
    req.session.results = await jw.search(req.params.query);
    res.render("guestresults", {
        loggedIn: (req.user ? true : false),
        error: errorFlag,
        list: req.session.results,
    });
    req.session.results = []
});

app.get("/logout", ensure.ensureLoggedIn(), function (req, res) {
    req.logout();
    res.redirect("/");
});

app.post("/register", function (req, res) {
    username = req.body.username;
    password = req.body.password;

    if (password.length < 8) {
        console.log("Password too short");
        return res.render("register", {
            error: "Password must be at least 8 characters.",
        });
    } else {
        User.register(
            new User({ username: username }),
            password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    let str = "Something went wrong";
                    if ("UserExistsError" === err.name) {
                        str = "Username already in use.";
                    }
                    return res.render("register", { error: str });
                }
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/dashboard");
                });
            }
        );
    }
});

app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/errlogin" }),
    function (req, res) {
        res.redirect("/dashboard");
    }
);

app.post("/dashboard", function (req, res) {
    let watchlist = req.body.watchlist;
    if (watchlist.length === 0) {
        return res.redirect("/dashboard");
    }
    let found = false;
    Watchlist.findOne(
        {
            user: req.session.passport.user.username,
            name: watchlist,
        },
        function (err, exists) {
            if (err) {
                console.log(err);
            } else if (exists) {
                errorFlag = "Duplicate watchlist.";
            } else {
                new Watchlist({
                    user: req.session.passport.user.username,
                    name: watchlist,
                    movies: [],
                }).save(function (err, newlist) {
                    if (err) {
                        console.log(err);
                    }
                    req.session.passport.user.watchlists.push(newlist);

                    User.findOneAndUpdate(
                        { user: req.session.passport.user.username },
                        {
                            $set: {
                                watchlists: req.session.passport.user.watchlists,
                            },
                        },
                        function (err, doc) {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                    successFlag = newlist.name + " successfully created.";
                });
            }
        }
    );
    res.redirect("/dashboard");
});

app.post("/dashboard/:wlist", function (req, res) {
    res.redirect(
        path.join(req.session.passport.user.currlist, "search", req.body.query)
    );
});

app.post("/search", function (req, res) {
    res.redirect(
        path.join("search", req.body.query)
    );
});

app.post("/search/:query", function (req, res) {
    res.redirect("/search/:" + req.body.query);
});

app.get("/*", (req, res) => {
    res.send('test')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

