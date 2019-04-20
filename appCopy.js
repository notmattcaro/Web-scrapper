// needs to happen because the page is asynchronous, and cannot be nested in a button
$(document).ready( function(event) {

    var articleData = [];

    $.getJSON("/articles", function(data) {
        return articleData.push(data);
    });
    console.log("==== this is the art ====");
    console.log(articleData);
    console.log(articleData);

// ========== SCRAPE ARTICLES EVENT ==========
    $("#scrape-articles").on("click", (event) => {
        event.preventDefault();

        $("#web-scraper-content").empty(); // ***** empties content

        function postArticles (image, header, summary, articleId) {
            // ========== CREATES ARTICLE BUILD VARIABLES ==========
                let articleCards = $("<div>").attr("class", "article-cards col s12 card horizontal"); // **** NEED TO ADD ARTICLE ID ****
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
                    postArticles(searchScraped.image, searchScraped.header, searchScraped.summary, searchScraped._id);
                }
                // this empties scrapedArticles array so that it doesn't keep appending the same articles
                scrapedArticles = [];
            }
        // ============ inside functions

            myArticleScraper(articleData);

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
    // $("button.button-save-articles").on("click", function() {
    //     $.ajax({
    //         method: "POST",
    //         url: "/articles/" + this.id,
    //         data:
    //     });
    // });
// ========== SAVED ARTICLES EVENT - END ==========
    
}); 






































