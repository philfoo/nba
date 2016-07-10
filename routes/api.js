const express = require('express');
const request = require('request');
const router = express.Router();
const utils = require('../script/utils.js').utils;
const stats = require('../lib/stats.js').stats;
const MongoClient = require('mongodb').MongoClient;
const tools = require('../lib/tools.js').tools;
const mongoUrl = 'mongodb://' 
                + process.env.MONGO_USER 
                + ":" 
                + process.env.MONGO_PASSWORD 
                + "@ds023704.mlab.com:23704/heroku_vkpt6gz1";


/*Endpoint that retrieves all of the game information for all the games
given a certain date parameter.
@param {String} date: String in format yyyymmdd*/
router.get('/date/:date', function(req, res){
    const date = req.params.date;
    const dateStatus = tools.checkValidDate(date);
    if (dateStatus !== "Valid"){
        res.status(400).send(dateStatus);
    }
    MongoClient.connect(mongoUrl, function(err, db){
        const collection = db.collection('nba_games');
        const cursor = collection.find({event_id: {$regex: date}});
        cursor.toArray(function(error, documents){
            if (error){
                console.log("There was an error");
                res.status(400).send(error);
            }else{
                res.status(200).send(documents);
            }
        });
    });
});

/*Endpoint that retrieves notable players sorted by a category.
Regular as mode returns overall best players in all categories.
@param {String} date: String in format yyyymmdd
@param {String} mode: Category to sort by. E.g. "rebounds", "points", "blocks", "regular"
*/
router.get('/notableplayers/:date/sortby/:mode', function(req, res){
    console.log("Notable players endpoint");
    const date = req.params.date;
    const mode = req.params.mode;
    const dateStatus = tools.checkValidDate(date);
    if (dateStatus !== "Valid"){
        res.status(400).send(dateStatus);
    }
    request.get({
        url: 'http://localhost:' + (process.env.PORT || '8080') + '/api/date/' + date
    }, function(error, response, body){
        if (error){
            console.log("There was an error");
            res.status(400).send(error)
        }else{
            const playersArray = tools.getAllPlayers(JSON.parse(body));
            const sortedArray = tools.sortPlayersBy(playersArray, mode);
            res.status(400).send(sortedArray);
        }
    })
});

router.get('/games/:date', function(req, res){
    console.log("Games endpoint");
    var date = req.params.date;
    request.get({
        url: 'http://localhost:' + (process.env.PORT || '8080') + '/api/date/' + date
    }, function(error, response, body){
        if (error){
            console.log("There was an error");
        }else{
            var gamesArray = tools.buildGamesArray(JSON.parse(body));
            res.send(gamesArray);
        }
    })
});

router.get('/player/:player', function(req, res){
    res.send("Hello, you've reached the player endpoint");
});


/*Date is in format "YYYYMMDD"*/
router.get('/reddit/:date', function(req, res){
    console.log("Reddit endpoint");
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