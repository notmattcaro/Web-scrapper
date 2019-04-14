// $.getJson("/r");

$(document).ready( function(event) {

    $("#scrape-articles").on("click", (event) => {
        event.preventDefault();
    
        alert("button works!");

        $("#web-scraper-content").empty();

        function postArticles () {
            // ========== CREATES ARTICLE BUILD VARIABLES ==========
            let articleCards = $("<div>").attr("class", "article-cards col s12 card horizontal");
                let cardImage = $("<div>").attr("class", "card-image");
                    // image defined before image tag && must be replaced by article image
                    let image = "#!";
                    let imageTag = $("<img>").attr("src", image).attr("alt", "General Images");

                let cardStacked = $("<div>").attr("class", "card-stacked");
                    let cardHeader = $("<div>").attr("class", "card-header");
                        // value of "headerText" to be replaced by article header
                        let headerText = "Header";

                    let cardContent = $("<div>").attr("class", "card-content card-paragraph-space");
                        // value of "contentText" to be replaced by article content
                        let contentText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nobis? Quas vitae nobis ipsa commodi, rerum omnis minus maiores facere.";
                    
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
        postArticles();
    });
    
}); 