const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

app.listen(port);
console.log("Server started!");

/*Eventual index.html file goes here*/
app.get('/', function(req, res){
	res.sendFile(path.resolve(__dirname + '/../client/index.html'));
	console.log("Home page visited");
});