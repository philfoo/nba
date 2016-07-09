const express = require('express');
const request = require('request');
const router = express.Router();
const utils = require('../src/utils.js').utils;
const stats = require('../lib/stats.js').stats;
const MongoClient = require('mongodb').MongoClient;
const tools = require('../lib/tools.js').tools;
const mongoUrl = 'mongodb://' 
                + process.env.MONGO_USER 
                + ":" 
                + process.env.MONGO_PASSWORD 
                + "@ds023704.mlab.com:23704/heroku_vkpt6gz1";


/*Date is in format YYYYMMDD*/
router.get('/date/:date', function(req, res){
    var date = req.params.date;
    var validity = tools.checkValidDate(date);
    if (validity === 'Valid'){
        MongoClient.connect(mongoUrl, function(err, db){
            var collection = db.collection('nba_games');
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

router.get('/notableplayers/:date', function(req, res){
    var date = req.params.date;
    request.get({
        url: 'http://localhost:' + (process.env.PORT || '8080') + '/api/date/' + date
    }, function(error, response, body){
        if (error){
            console.log("There was an error");
        }else{
            var playersArray = tools.getAllPlayers(JSON.parse(body));
            var sortedArray = tools.sortPlayersByRating(playersArray);
            res.send(sortedArray);
        }
    })
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