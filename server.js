// ================ GLOBAL VARIABLES ================

// creates get, post, update, delete
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// scraping tools axios to grab from 
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
// const db = require("./models");

var PORT = 9000;

// Initialize Express
var app = express(); 

// ================== MIDDLEWARE SETUP ==================

// Use morgan logger for logging requests
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// make public a static folder that we can use and apply 
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongod://localhost/unit18Populater", { useNewUrlParser: true });

// ================= ROUTE SETUP ======================

// Scrape Route
app.get("/scrape", function(req, res) {
    // 
    axios.get("https://medium.com/").then(function(response) {
        var $ = cheerio.load(response.data);
        // console.log('====== Cheerios "$" =========== ');
        // console.log($); // check what axios returns
        // console.log('====== Cheerios "$" End =========== ');

        $("article.extremePostPreview").each(function(i, element) {
            //do this
            var result = {}; //
            
            result.title = $(this)
                .children("div.extremePostPreview-post a.ds-link.ds-link--styleSubtle.ui-capsSubtle h2.ui-h2.ui-xs-h4.ui-clamp3")
                .text();
            result.summary = $(this) 
                .children("a.ds-link.ds-link--stylePointer.u-width100pct div.ui-summary.ui-clamp2.u-marginTop2")
                .text();
            result.image = $(this)
                .children("div.extremePostPreview-image.u-flex0 a")
                .attr("href");

            console.log("===== Result =====");
            console.log(result);
            console.log("===== Result =====");
            
        });
    });
});

// ================ PORT STARTER =====================
// Shows what port to listen too 
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
})