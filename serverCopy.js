// ================ GLOBAL VARIABLES ================
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3300;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// ========== HEROKU MONGOLAB ADD-ON ==========
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// ================= ROUTE SETUP ======================

// Scrape Route
app.get("/scrape", function(req, res) { // **** How and when is this called?

    axios.get("https://www.nytimes.com/section/technology").then(function(response) {
        var $ = cheerio.load(response.data);

        // references 'article' element with its associated classes
        $("div.css-4jyr1y").each(function(i, element) {

            var result = {}; 
            //saves result.image/.header/.summary to the result object
            result.image = $(this)
                //grabs the 'img' within the 'div' within 'figure' within 'div' within 'a'
                .find("a").find("div.css-79elbk").find("figure.css-196wev6.toneNews").find("div.css-79elbk").find("img.css-11cwn6f")
                .attr("src"); //holds img value
                console.log("===== result =====");
                console.log("image:  " + result.image);
            result.header = $(this)
                //grabs 'h2' within 'a'
                .find("a").find("h2.css-1dq8tca.e1xfvim30")
                .text(); //gets header text
                console.log("header:  " + result.header);
            result.summary = $(this) 
                //grabs 'p' within 'a'
                .find("a").find("p.css-1echdzn.e1xfvim31")
                .text();//gets summary text
                console.log("summary:  " + result.summary);
                console.log("\n");
            //references the Article model and inserts the result we just created
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                
                })
                .catch(function(err) {
                    console.log(err);
                }); 
        });
        console.log("========== result overall ============");
        console.log(result);
        console.log("========== result overall ============");
        res.send("Scraping NYT is complete");
    });

    res.send("The Scrape was complete!");
});

// Articles Route
app.get("/articles", function(req, res) {
    db.Article.find({}) // finds all articles in db
        .then((dbArticle) => {
            res.json(dbArticle); //returns a promise of 
        })
        .catch((err) => {
            res.json(err);
        });         
});

// ================ PORT STARTER =====================
// Shows what port to listen too 
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});