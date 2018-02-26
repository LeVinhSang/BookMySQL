let express = require('express');
let mysql = require('mysql');
let bodyParser = require('body-parser');
let statement = require('./StatementSQL/statement');
let config = require('./config');
let middleware = require('../middleware/middleware');

let app = express();

let connection = mysql.createConnection(config);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/Books', (req, res) => {
    connection.query(statement.select, (err, result) => {
        if(err) res.status(500).send(err);
        res.send(result);
    });
});

app.get('/Book/:id', (req, res) => {
    connection.query(statement.selectId, req.params.id, (err, result) => {
        if(err) res.status(500).send(err);
        res.status(200).send(result);
    });
});

app.post('/Book',middleware, (req, res) => {
    connection.query(statement.insert, req.body, (err) => {
        if(err) res.status(500).send(err);
        res.status(201).send({message : 'Success...!'});
    });
});

app.put('/Book/:id', (req, res) =>{
    connection.query(statement.update + req.params.id, req.body, (err) => {
        if(err) res.status(500).send(err);
        res.status(200).send({message : 'Success...!'});
    });
});

app.delete('/Book/:id', (req, res) => {
    connection.query(statement.delete, req.params.id, (err) => {
        if(err) res.status(500).send(err);
        res.status(200).send({message : 'Success...!'});
    });
});

app.listen(3000, () =>{
    console.log('Sever Running');
});