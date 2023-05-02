// Load Express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var DBHost = process.env["DBHOST"] || "db";

app.use(bodyParser.json());

const mongoose = require("mongoose");
require("./Book.js");
const Book = mongoose.model('Book');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://192.168.1.2:27017/booksDb', () => {
    console.log("Database connected");
});

//get Service
app.get('/', (req, res) => {
    res.send("This is book service");
})

app.post('/book', async (req, res) => {
    // this is our create function
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberofpages: req.body.numberofpages,
        publisher: req.body.publisher
    }

    // create a new book 
    var savBook = new Book(newBook);
    savBook.save().then(() => {
        console.log('New Book created')
    }).catch((err) => {
        console.log(err)
    })
    res.send('New book added to database');
})


app.get("/books", (req, res) => {
    Book.find().then((books) => {
        res.json(books);
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book)
        } else {
            res.sendStatus(404)
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})

app.delete("/book/:id", (req, res) => {
    Book.findByIdAndRemove(req.params.id).then(() => {
        res.send("Book Deleted Successfully");
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})
// listen
app.listen(4545, () => {
    console.log("Up and Running!! - Books Service");
})
