const request = require('request');

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
		        for (var i = 0; i < eventsArray.length; i++){
		        	eventIds.push(eventsArray[i].event_id);
		        }
		        callback(eventIds);
		    }
		});
	},

	queryGameStats: function(date){

	},

	postToMongo: function(obj){

	}
};

exports.utils = utils;