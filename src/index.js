const request = require('request');
const async = require('async');
const utils = require('./utils').utils;
const MongoClient = require('mongodb').MongoClient;

var currentDate = new Date('December 16, 2011 00:00:00');
var endingDate = new Date('June 21, 2016 00:00:00');

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
        clearInterval(myInterval);
        utils.queryGameStats(eventIdArray);
        return;
    }
    utils.queryXMLEvents(datesArray[i], function(dayArray){
        for(var j = 0; j < dayArray.length; j++){
            eventIdArray.push(dayArray[j]);
        }   
        console.log(eventIdArray);
    });
    i++;
}, 11*1000);




