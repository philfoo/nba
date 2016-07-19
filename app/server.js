const express = require('express');
const path = require('path');
const app = express();
const api = require('../routes/api.js');
const request = require('request');

const port = process.env.PORT || 8080;

app.listen(port);
console.log("Server started!");

app.set('view engine', 'pug');

/*Eventual index.html file goes here*/
app.get('/:date', function(req, res){
    /*res.sendFile(path.resolve(__dirname + '/../client/index.html'));*/
    var date = req.params.date;
    res.render(__dirname + '/../client/index.pug', {date: date});
    console.log("Date page visited: " + date);
});

app.get('/', function(req, res){
    res.render(__dirname + '/../client/index.pug');
    console.log("Home page visited")
})

app.use(express.static(__dirname + '/../'));
/*Handle routes for the apis*/
app.use('/api', api);




