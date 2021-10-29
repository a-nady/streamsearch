StreamList*

*subject to change

## Overview

Sometimes, you want to watch a film/tv show, but because of the many streaming services nowadays, it can get confusing on where exactly you can watch it. This web app will allow the user to easily find out where each of the shows they want to watch belongs to what most popular streaming services (Netflix, Disney+, Hulu, TBD). They can make multiple watchlists, and within those watchlists can contain content from different streaming services, and also mark whether they watched it yet or not, allowing the user to keep track of what they want to watch instead of slowly going through each streaming service app.


## Data Model

The application will store watchlists, and with the watchlist containing information like streaming service it's available on (can be multiple), title, date released, etc..

* users can have multiple watchlists (via references)
* each watchlist can have multiple films/tvs with containing information about the movie(not sure if possible yet)

An Example User:

```javascript
{
  username: "shannonshopper",
  hash: // a password hash,
  lists: // an array of references to List documents
}
```

An Example List with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "Nostalgic Movies",
  items: [
    { title: "The Lion King", streaming_service: "Disney+", date_released: 1994, description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself."},
  ],
  createdAt: // timestamp
}
```


## [Link to Commented First Draft Schema](db.js) 

```javascript
const User = new mongoose.Schema({
  	// store user information
    username: String,
    password: String,
  	// watchlist will contain a list of seperate lists of movies/tv
    watchlists: [Watchlist]
});

const Watchlist = new mongoose.Schema({
  	// name of the watch list as well as an array of all the content being stored by the user in that watchlist
    name: String,
    movies: [Movie]
});

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
```

## Wireframes

/- home page showing all watchlists for the user as well as the ability to create a new watchlist (I want to see if i could maybe parse an image from one of the titles or multiple titles within the watchlist to display on the watchlist instead of the generic images shown below)

![list create](documentation/index.png)

/list - page for showing all content in watchlist, maybe another page showing more information about the tv/movie's if selected on

![list](documentation/list.png)

## Site map

![list](documentation/sitemap.png)

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a watchlist
4. as a user, I can view all of the content I've added in a single list
5. as a user, I can add content to an existing watchlist
6. as a user, I can remove content off a watchlist
7. as a user, I can remove a watchlist
8. as a user, i can select any content within the list to see more information about it.

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) react.js
    * There are not many dynamic elements i could think of in this project so far, but it may improve how the UI looks and modernization.
    * For example, when viewing the list of content, instead of going to a new page, I could use the virtual DOM to expand and show information about a specific movie/film.
* (2 points) Bootstrap:
    * To be used along with react.
* (3 points) The several APIs needed to scrape content from all the services:
    * https://api.watchmode.com
    * There are several ways I could go about this:
        * When user enters the title, the server could make an API call each time seeing if the title exists anywhere.
        * Or when the server starts, perform API calls asking for all shows/movies from everywhere and create a database containing all the titles from all the services (or maybe just every 24 hours as the content is likely to stay the same). Then when user searches, it just does .find on the database. This is probably much faster as all the data is cached on the server and no API calls to external servers have to be made when user searches for anything
        * (this API also has limited amount of calls on a free acount).
            * This method would also doesn't need exact matching if it searches the database.
* (1 points) Imdb-api to use for descriptions:
    * https://www.npmjs.com/package/imdb-api



9 points total out of 8 required points


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

