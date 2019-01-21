const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const promotions = require('./db');
const uuidv4 = require('uuid/v4');
 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/promotions', (req, res) => {
  res.json(promotions)
});

app.get('/promotions/:id', (req, res) => {
    res.json(promotions.find(item => item.id === req.params.id))
});

app.post('/promotions', (req, res) => {
    const data = req.body
    data.id = uuidv4()
    promotions.push(data)
    res.status(201).json(data)
});

app.put('/promotions/:id', (req, res) => {
    const updateIndex = promotions.findIndex(item => item.id === req.params.id)
    res.json(Object.assign(promotions[updateIndex], req.body))
});

app.delete('/promotions/:id', (req, res) => {
    const deletedIndex = promotions.findIndex(item => item.id === req.params.id)
    promotions.splice(deletedIndex, 1)
    res.status(200).json(promotions)
});

app.listen(3002, () => {
    console.log('Start server at port 3002.')
});