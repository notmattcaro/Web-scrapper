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
mongoose.connect("mongodb://localhost/webScrapperPoulator", { useNewUrlParser: true });

// ================= ROUTE SETUP ======================

// Scrape Route
app.get("/scrape", function(req, res) {
    // 
    axios.get("https://medium.com/").then(function(response) {
        var $ = cheerio.load(response.data);
        // console.log('====== Cheerios "$" =========== ');
        // console.log($); // check what axios returns
        // console.log('====== Cheerios "$" End =========== ');

        // LINE 46 MIGHT HAVE AN ERROR && SAME WITH THE CHILDREN 
        $("article.extremePostPreview.u-marginBottom48.uiScale.uiScale-ui--small.uiScale-caption--small").each(function(i, element) {
            var result = {}; 
            
            //saves result.image/.header/.summary to the result object
            result.image = $(this)
                //grabs the 'a' 'href' within the 'div'
                .children("div.extremePostPreview-image.u-flex0 a")
                .attr("href");
            result.header = $(this)
                //grabs the 'h2' text within the 'a' within the 'div'
                .children("div.extremePostPreview-post.u-minWidth0.u-flex1.u-marginRight24.u-textAlignLeft.js-trackPostPresentation a.ds-link.ds-link--stylePointer.u-overflowHidden.u-flex0.u-width100pct h2.ui-h2.ui-xs-h4.ui-clamp3")
                .text();
            result.summary = $(this) 
                //grabs the 'div' text wtihin the 'a'
                .children("a.ds-link.ds-link--stylePointer.u-width100pct div.ui-summary.ui-clamp2.u-marginTop2")
                .text();

            //references the Article model and inserts the result we just created
            db.Article.create(result)
                .then((dbArticle) => {
                    console.log(dbArticle);
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log("===== Result =====");
            console.log(result);
            console.log("===== Result =====");
        });
        res.send("Scraping Medium is complete ")
    });
});

// ================ PORT STARTER =====================
// Shows what port to listen too 
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});