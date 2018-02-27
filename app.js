let express = require('express');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let statement = require('./StatementSQL/statement');
let config = require('./config');
let middleware = require('./middleware/middleware');

let app = express();

let connection = mysql.createConnection(config);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/books', (req, res) => {
    connection.query(statement.select, (err, result) => {
        if(err) res.status(500).send(err);
        res.send(result);
    });
});

app.get('/book/:id', (req, res) => {
    connection.query(statement.selectId, req.params.id, (err, result) => {
        if(err) res.status(500).send(err);
        res.send(result);
    });
});

app.get('/books/storeDelete', (req, res) => {
    connection.query(statement.storeDelete, (err, result) => {
        if(err) res.status(500).send(err);
        res.send(result);
    });
});

app.post('/book', middleware, (req, res) => {
    connection.query(statement.insert, req.body, (err) => {
        if(err) res.status(500).send(err);
        res.status(201).send({message : 'Success...!'});
    });
});

app.put('/book/:id', (req, res) => {
    connection.query(statement.update + req.params.id + ' limit 1', req.body, (err) => {
        if(err) res.status(500).send(err);
        res.send({message : 'Success...!'});
    });
});

app.put('/books/restore', (req, res) => {
    connection.query(statement.restore, (err) => {
        if(err) res.status(500).send(err);
        res.send({message : 'restore Success...!'});
    });
});

app.put('/book/restoreID/:id', (req, res) => {
    connection.query(statement.restoreID, req.params.id, (err) => {
        if(err) res.status(500).send(err);
        res.send({message : 'restore success...!'});

    });
});

app.delete('/book/:id', (req, res) => {
    connection.query(statement.softDelete, req.params.id, (err) => {
        if(err) res.status(500).send(err);
        res.send({message : 'Success...!'});
    });
});

app.delete('/book/softDelete/:id', (req, res) => {
    connection.query(statement.delete, req.params.id, (err) => {
        if(err) res.status(500).send(err);
        res.send({message : 'delete Success...!'});
    });
});

app.patch('/book/:id', (req, res) => {
    connection.query(statement.update + req.params.id, req.body, (err) => {
        if(err) res.send(500).send(err);
        res.send({message : 'Success...!'});
    });
});

app.listen(3000, () => {
    console.log('Sever Running');
});
