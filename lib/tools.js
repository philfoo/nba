var stats = require('./stats.js');
var tools = {
    checkValidDate: function(date){
        if (date.length !== 8){
            return "Improper length, date needs to be 8 characters";
        }
        else if ((date.substring(0,4) > "2018") || (date.substring(0,4) < "2011")){
            return "Year is invalid";
        }
        else if ((date.substring(4,6) > "12") || (date.substring(4,6) < "00")){
            return "Month is invalid";
        }
        else if ((date.substring(6,8) > "31") || (date.substring(6,8) < "00")){
            return "Day is invalid";
        }
        return "Valid";
    },

    /*Converts given date to epoch time*/
    convertDateToEpoch: function(date){
        return date.getTime() / 1000;
    },

    formatIntoDate: function(date){
        if (tools.checkValidDate(date) === 'Valid'){
            var dateString = date.substring(0,4) 
                            + '-'
                            + date.substring(4,6)
                            + '-'
                            + date.substring(6,8)
                            + ' 00:00:00';
            var dateObject = new Date(dateString);
            return dateObject;
        }else{
            return null;
        }
    },

    generateRedditUrl: function(startTime, endTime){
        return 'https://www.reddit.com/r/nba/search.json?sort=top&q=timestamp%3A'
                    + startTime
                    + '..'
                    + endTime
                    + '&restrict_sr=on&syntax=cloudsearch';
    },

    getAllPlayers: function(gamesArray){
        var players = [];
        for (var i = 0; i < gamesArray.length; i++){
            var game = gamesArray[i];
            for (var j = 0; j < game.away_stats.length; j++){
                players.push(game.away_stats[j]);
            }
            for (var j = 0; j < game.home_stats.length; j++){
                players.push(game.home_stats[j]);
            }
        }
        return players;
    },

    sortPlayersBy: function(playersArray, mode){
        if (mode === "regular"){
            var playerObjects = [];
                for (var i = 0; i < playersArray.length; i++){
                    var playerObject = stats.getPlayerRating(playersArray[i]);
                    if (playerObject != null){
                        playerObjects.push(playerObject);
                    }
                }
                playerObjects.sort(function(a, b){
                    return b.playerRating - a.playerRating;
                });
                return playerObjects;
        }else{
            if (playersArray[0][mode] != null){
                playersArray.sort(function(a, b){
                    return b[mode] - a[mode];
                })
                return playersArray;
            }
            return "Invalid mode";
        }
    }   
};

exports.tools = tools;