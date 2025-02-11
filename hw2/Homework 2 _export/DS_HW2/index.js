//import express module 
const express = require('express');
//create an express app
const  app = express();
//require express middleware body-parser
const bodyParser = require('body-parser');

//set the view engine to ejs
app.set('view engine', 'ejs');
//set the directory of views
app.set('views', './views');
//specify the path of static directory
app.use(express.static(__dirname + '/public'));

//body parser parses the incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// By default, we have 3 books
var books = [
    { "BookID": "1", "Title": "Book 1", "Author": "Author 1" },
    { "BookID": "2", "Title": "Book 2", "Author": "Author 2" },
    { "BookID": "3", "Title": "Book 3", "Author": "Author 3" }
];

//route to root
app.get('/', function (req, res) {
    res.render('home', { books: books });
});

// route to render create view
app.get('/create', function (req, res) {
    res.render('create');
});

// add new book
app.post('/add-book', (req, res) => {
    const { title, author } = req.body;

    if (!title.trim() || !author.trim()) {
        return res.status(400).send('Book title and author name are required');
    }
    const newBook = { BookID: (books.length + 1).toString(), Title: title, Author: author };
    books.push(newBook);
    res.redirect('/');
});

// route to render update view
app.get('/update', function (req, res) {
    res.render('update');
});

// update book 
app.post('/update-book', (req, res) => {
    const { BookID, Title, Author } = req.body;

    for (let i = 0; i < books.length; i++) {
        if (books[i].BookID === BookID) {
            books[i].Title = Title;
            books[i].Author = Author;
            break;
        }
    }
    res.redirect('/');
});

// route to render delete view
app.get('/delete', function (req, res) {
    res.render('delete');
});

// delete book with the highest ID
app.post('/delete-book', (req, res) => {
    if (books.length > 0) {
        // find the highest book id
        const highestID = Math.max(...books.map(book => parseInt(book.BookID)));
        // remove the book
        books = books.filter(book => parseInt(book.BookID) !== highestID);
    }
    res.redirect('/');
});

// Start the server
app.listen(5000, function () {
    console.log("Server listening on port 5000");
});
