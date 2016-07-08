const express = require('express');
const request = require('request');
const router = express.Router();
const utils = require('../src/utils.js').utils;
const MongoClient = require('mongodb').MongoClient;
const tools = require('../lib/tools.js').tools;
const mongoUrl = 'mongodb://' 
                    + 'phil'
                    + ":" 
                    + 'test'
                    + "@ds047930.mlab.com:47930/heroku_vs8g6249";


/*Date is in format YYYYMMDD*/
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
    res.send("Hello, you've reached the player endpoint");
});


/*Date is in format "YYYYMMDD"*/
router.get('/reddit/:date', function(req, res){
    var date = tools.formatIntoDate(req.params.date);
    if (date == null){
        res.send("Error, incorrect date format");
        return;
    }
    var beginningTime = tools.convertDateToEpoch(date);
    
    var nextDate = utils.getNextDate(date);
    var endTime = tools.convertDateToEpoch(nextDate);

    var redditUrl = tools.generateRedditUrl(beginningTime, endTime);
    request.get({
            url: redditUrl
        }, function(error, response, body){
            if(error){
                console.log(error);
            }
            else{
                res.send(JSON.parse(body));
            }
        }
    );

});


module.exports = router;