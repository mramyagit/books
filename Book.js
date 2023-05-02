const mongoose = require("mongoose");

// Model for a book
mongoose.model("Book", {
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberofpages: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    },
});