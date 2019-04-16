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

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// ================= ROUTE SETUP ======================

// Scrape Route
app.get("/scrape", function(req, res) {

    axios.get("https://www.nytimes.com/section/technology").then(function(response) {
        var $ = cheerio.load(response.data);

        // LINE 46 MIGHT HAVE AN ERROR && SAME WITH THE CHILDREN 
        var result = {}; 
        // references 'article' element with its associated classes
        $("div.css-4jyr1y").each(function(i, element) {
            
            //saves result.image/.header/.summary to the result object
            result.image = $(this)
                //grabs the 'a' 'href' within the 'div'
                .children("a div.css-79elbk figure.css-196wev6.toneNews div.css-79elbk img.css-11cwn6f")
                // .children("a.u-block.u-backgroundCover.u-sizeFull")
                .attr("src"); //holds href value
            result.header = $(this)
                //grabs the 'h2' text within the 'a' within the 'div'
                .children("a div.css-79elbk h2.css-1dq8tca.e1xfvim30")
                // .children("a.ds-link.ds-link--stylePointer.u-overflowHidden.u-flex0.uwidth100pct")
                // .children("h2.ui-h2.ui-xs-h4.ui-clamp3")
                .text(); //gets header text
            result.summary = $(this) 
                //grabs the 'div' text wtihin the 'a'
                .children("a p.css-1echdzn e1xfvim31")
                // .children("div.ui-summary.ui-clamp2.u-marginTop2")
                .text();//gets summary text

            //references the Article model and inserts the result we just created
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                
                })
                .catch(function(err) {
                    console.log(err);
                });

            console.log("===== Result =====");
            console.log(result);
            console.log("===== Result =====");

            result = $(this).contents().length
            console.log(result);
        });
        res.send("Scraping NYT is complete ")
    });
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