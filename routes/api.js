const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const tools = require('../lib/tools.js').tools;
const mongoUrl = 'mongodb://' 
                    + 'phil'
                    + ":" 
                    + 'test'
                    + "@ds047930.mlab.com:47930/heroku_vs8g6249";


router.get('/date/:date', function(req, res){
	var date = req.params.date;
	var validity = tools.checkValidDate(date);
	if (validity === 'Valid'){
		MongoClient.connect(mongoUrl, function(err, db){
		    var collection = db.collection('nba_test');
		    var cursor = collection.find({event_id: {$regex: date}});
		    cursor.toArray(function(err, documents){
		        if (err){
		            console.log("There was an error");
		        }else{
		            res.status(200).send(documents);
		        }
		    });
		});
	}else{
		res.status(400).send(validity);
	}
	
});

router.get('/player/:player', function(req, res){
	res.send("Hello, you've reached the player endpoint")
})


module.exports = router;