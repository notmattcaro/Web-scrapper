var mongoose = require("mongoose");
//reference to our Schema constructor
var Schema = mongoose.Schema;

var articlesYoSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
});

var Article = mongoose.model("Article", articlesYoSchema);

module.exports = Article;