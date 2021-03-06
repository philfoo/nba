const request = require('request');
const MongoClient = require('mongodb').MongoClient;

var utils = {
    getNextDate: function(date){
        date.setDate(date.getDate()+1);
        return date;
    },

    formatDate: function(date){
        var dd = date.getDate().toString();
        var mm = (date.getMonth()+1).toString();
        var yyyy = (date.getFullYear()).toString();
        if (mm.length == 1){
            mm = '0' + mm;
        }
        if (dd.length == 1){
            dd = '0' + dd;
        }
        return yyyy + mm + dd;
    },

    queryXMLEvents: function(date, callback){
        console.log("Date: " + date);
        var eventsUrl = 'https://erikberg.com/events.json?date=' + date + '&sport=nba';
        var eventIds = [];
        request.get({
            url: eventsUrl,
            headers: {
                'Authorization': 'Bearer ' + process.env.TOKEN,
                'User-Agent': 'philip.foo@duke.edu'
            }
        }, function(error, response, body){
            if(error){
                console.log(error);
            }
            else{
                var eventsArray = JSON.parse(body).event;
                if(eventsArray == undefined){
                    return;
                }
                for (var i = 0; i < eventsArray.length; i++){
                    var event = eventsArray[i];
                    if (event.event_status === 'completed' && event.season_type !== 'pre'){
                        eventIds.push(event.event_id);
                        console.log("Pushing " + event.event_id);
                    }
                }
                callback(eventIds);
            }
        });
    },

    queryGameStats: function(idArray){
        var gameUrl = "";
        var index = 0;

        var gameInterval = setInterval(function(){
            if (index >= idArray.length){
                clearInterval(gameInterval);
                console.log("Done.");
                return;
            }
            gameUrl = 'https://erikberg.com/nba/boxscore/' + idArray[index] + '.json';
            console.log("querying " + gameUrl);

            request.get({
                url: gameUrl,
                headers: {
                    'Authorization': 'Bearer ' + process.env.TOKEN,
                    'User-Agent': 'philip.foo@duke.edu'
                }
            }, function(error, response, body){
                if (error){
                    console.log("There was an error retrieving the game");
                }else{
                    var obj = (JSON.parse(body));
                    obj.event_id = idArray[index-1];
                    utils.postToMongo(obj);
                }
            });

            index++;

        }, 13*1000)

    },

    postToMongo: function(obj){
        var mongo_url = 'mongodb://' 
                    + process.env.MONGO_USER 
                    + ":" 
                    + process.env.MONGO_PASSWORD 
                    + "@ds023704.mlab.com:23704/heroku_vkpt6gz1";

        MongoClient.connect(mongo_url, function(err, db){
            var collection = db.collection('nba_games');
            collection.insertOne(obj, function(err, r){
                if(err){
                    console.log("There was an error");
                }else{
                    console.log("Success!");
                    db.close();
                }
            });
        });
    }

};

exports.utils = utils;