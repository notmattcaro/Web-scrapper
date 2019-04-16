// needs to happen because the page is asynchronous, and cannot be nested in a button
$.getJSON("/articles", function(data) {
    console.log("========== DATA HERE ==========");
    console.log(data);
    console.log("========== DATA HERE ==========");
});

$(document).ready( function(event) {

// ====== TEST DATA PULL BUTTON ======
    $("#data-pull-test").on("click", (event) => {
        event.preventDefault();
        $.getJSON("/articles", function(data) {
            console.log("========== DATA HERE ==========");
            console.log(data);
            console.log("========== DATA HERE ==========");
        });
    });
// ====== TEST DATA PULL BUTTON - END ======

// ====== TEST ARRAY OF OBJECTS ======
        let scrapeArticlesArray = function(image, header, summary) {
            this.image = image;
            this.header = header;
            this.summary = summary;
        }

        var articleOne = new scrapeArticlesArray("#!", "Headers 1", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nobis? Quas vitae nobis ipsa commodi, rerum omnis minus maiores facere.");
        var articleTwo = new scrapeArticlesArray("#!", "Headers 2", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nobis? Quas vitae nobis ipsa commodi, rerum omnis minus maiores facere.");
        var articleThree = new scrapeArticlesArray("#!", "Headers 3", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nobis? Quas vitae nobis ipsa commodi, rerum omnis minus maiores facere.");

        let scrapedArticles = [];

        console.log(scrapedArticles);
// ====== TEST ARRAY OF OBJECTS - END ======

// ========== SCRAPE ARTICLES EVENT ==========
    $("#scrape-articles").on("click", (event) => {
        event.preventDefault();

        $("#web-scraper-content").empty();
        scrapedArticles.push(articleOne, articleTwo, articleThree);
        console.log("==== scraped articles array below! =====");
        console.log(scrapedArticles);
            
        function postArticles (image, header, summary) {
            // ========== CREATES ARTICLE BUILD VARIABLES ==========
            let articleCards = $("<div>").attr("class", "article-cards col s12 card horizontal");
            let cardImage = $("<div>").attr("class", "card-image");
            // image defined before image tag && must be replaced by article image
            let imageTag = $("<img>").attr("src", image).attr("alt", "General Images");
            
            let cardStacked = $("<div>").attr("class", "card-stacked");
                let cardHeader = $("<div>").attr("class", "card-header");
                // value of "headerText" to be replaced by article header
                let headerText = header;
                
                let cardContent = $("<div>").attr("class", "card-content card-paragraph-space");
                // value of "contentText" to be replaced by article content
                let contentText = summary;
                
                let buttonHolderPadd = $("<div>").attr("class", "button-holder-padding");
                    let button = $("<button>").attr("class",  "btn waves-effect waves-light button-save-articles").text("save");
            
            // ========== APPENDS ALL BUILD VARIABLES TO CREATE CARD ==========
            articlesCards = articleCards.append(
                cardImage.append(imageTag)).append(
                    cardStacked.append(cardHeader.append(headerText)).append(cardContent.append(contentText)).append(buttonHolderPadd.append(button))
                    );
            // ========== PREPENDS LATEST ARTICLES ==========
            $("#web-scraper-content").prepend(articleCards);
        }
        let myArticleScraper = function(myScraped) {
            for (let i = 0; i < myScraped.length; i++) {
                    const searchScraped = myScraped[i];
                postArticles(searchScraped.image, searchScraped.header, searchScraped.summary);
            }
            // this empties scrapedArticles array so that it doesn't keep appending the same articles
            scrapedArticles = [];
        }
        myArticleScraper(scrapedArticles);
    });
// ========== SCRAPE ARTICLES EVENT - END ==========

// ========== CLEAR ARTICLES EVENT ==========
    $("#clear-articles").on("click", (event) => {
        event.preventDefault();

        $("#web-scraper-content").empty();
        scrapedArticles = [];
        console.log("==== scraped articles array below! =====");
        console.log(scrapedArticles);

        function clearArticles() {
            // ===== CREATES ALL BUILD VARIABLES =====
            let clearedMessage = $("<div>").attr("class", "article-cards col s12 card horizontal");
                let cardStackedCM = $("<div>").attr("class", "card-stacked");
                    let cardHeaderCM = $("<div>").attr("class", "card-header center").text("Articles Cleared!");
                    let cardContentCM = $("<div>").attr("class", "card-content card-paragraph-space center").append("Feel free to re-scrape or click on our <em>SAVED</em> tab found above on our navbar!");
            // ===== APPENDS ALL BUILD VARIABLES =====
            clearedMessage = clearedMessage.append(cardStackedCM.append(cardHeaderCM).append(cardContentCM));
            // ===== APPENDS CLEARED MESSAGE =====
            return $("#web-scraper-content").append(clearedMessage);
        }
        clearArticles();
    });
// ========== CLEAR ARTICLES EVENT - END ==========

// ========== SAVED ARTICLES EVENT ==========

// ========== SAVED ARTICLES EVENT - END ==========
    
}); 