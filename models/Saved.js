var mongoose = require("mongoose");
//reference to our Schema constructor
var Schema = mongoose.Schema;

var savedSchema = new Schema({
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

var Saved = mongoose.model("Saved", savedSchema);

module.exports = Saved;