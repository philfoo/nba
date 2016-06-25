const request = require('request');
const async = require('async');
const utils = require('./utils').utils;
const MongoClient = require('mongodb').MongoClient;


var currentDate = new Date('December 16, 2011 00:00:00');
var endingDate = new Date('June 24, 2016 00:00:00');

//Go through all dates, grab events array
//Iterate through events array, grabbing event_id
//Query every single event ID
var datesArray = [];
while(currentDate.getTime() < endingDate.getTime()){
    datesArray.push(utils.formatDate(currentDate));
    currentDate = utils.getNextDate(currentDate);
};


var i = 0;
var eventIdArray = [];
var myInterval = setInterval(function(){
    if (i >= datesArray.length){
        clearInterval(myInterval)
    }
    utils.queryXMLEvents(datesArray[i], function(dayArray){
        for(var j = 0; j < dayArray.length; j++){
            eventIdArray.push(dayArray[j]);
        }   
        console.log(eventIdArray);
    });
    i++;
}, 11*1000);



var mongo_url = 'mongodb://' + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@ds023054.mlab.com:23054/heroku_g83bgn25";
MongoClient.connect(mongo_url, function(err, db){
    var collection = db.collection('nba_games');
    collection.insertOne({a: 1}, function(err, r){
        if(err){
            console.log("There was an error");
        }else{
            console.log("Success!");
            db.close();
        }
    });
});





