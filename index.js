'use strict';

const path = require('path');

const express = require('express');
const app = express();

const { port, host, storage } = require('./serverConfig.json');

const Datastorage = require(path.join(__dirname, storage.storageFolder, storage.dataLayer));

const dataStorage = new Datastorage();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const homePath = path.join(__dirname, 'home.html');

app.get('/', (req, res) => res.sendFile(homePath));

app.get('/all', (req, res) =>
    dataStorage.getAll().then(data => res.render('allBooks', { result: data }))
);

app.get('/getBook', (req, res) =>
    res.render('getBook', {
        title: 'Find Book',
        header1: 'Find Book by ID',
        action: '/getBook'
    })
);

app.post('/getBook', (req, res) => {
    if (!req.body) return res.sendStatus(500);

    const bookId = req.body.bookID;
    dataStorage.getOne(bookId)
        .then(book => res.render('bookPage', { result: book }))
        .catch(error => sendErrorPage(res, error));

});

app.get('/inputform', (req, res) =>
    res.render('form', {
        title: 'Add Book',
        header1: 'Add a new Book',
        action: '/input',
        bookID: { value: '', readonly: '' },
        name: { value: '', readonly: '' },
        author: { value: '', readonly: '' },
        type: { value: '', readonly: '' },
        topic: { value: '', readonly: '' }
    }));

app.post('/input', (req, res) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.insert(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));
});

app.get('/updateform', (req, res) =>
    res.render('form', {
        title: 'Update Book',
        header1: 'Update Book data',
        action: '/updatedata',
        bookID: { value: '', readonly: '' },
        name: { value: '', readonly: 'readonly' },
        author: { value: '', readonly: 'readonly' },
        type: { value: '', readonly: 'readonly' },
        topic: { value: '', readonly: 'readonly' }
    }));

app.post('/updatedata', (req, res) => {
    if (!req.body) return res.sendStatus(500);

    dataStorage.getOne(req.body.bookID)
        .then(book =>
            res.render('form', {
                title: 'Update Book',
                header1: 'Update Book data',
                action: '/update',
                bookID: { value: book.bookID, readonly: 'readonly' },
                name: { value: book.name, readonly: '' },
                author: { value: book.author, readonly: '' },
                type: { value: book.type, readonly: '' },
                topic: { value: book.topic, readonly: '' }
            })
        )
        .catch(error => sendErrorPage(res, error));
});

app.post('/update', (req, res) => {
    if (!req.body) return res.statusCode(500);

    dataStorage.update(req.body)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));
});

app.get('/removeBook', (req, res) =>
    res.render('getBook', {
        title: 'Remove',
        header1: 'Remove',
        action: '/removeBook'
    })
);

app.post('/removeBook', (req, res) => {
    if (!req.body) return res.sendStatus(500);

    const bookId = req.body.bookID;
    dataStorage.remove(bookId)
        .then(status => sendStatusPage(res, status))
        .catch(error => sendErrorPage(res, error));

});

app.listen(port, host, () => console.log(`Server ${host}:${port} listening...`));

//helper functions
function sendErrorPage(res, error, title = 'Error', header1 = 'Error') {
    sendStatusPage(res, error, title, header1);
}

function sendStatusPage(res, status, title = 'Status', header1 = 'Status') {
    return res.render('statusPage', { title, header1, status });
}
