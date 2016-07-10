var stats = require('./stats.js');
var tools = {
    /*
    Function that receives a string and makes sure it's in a valid date format
    @param {String} date
    @return {String} Status of the inputted String. "Valid" if is a valid date
    */
    checkValidDate: function(date){
        if (date == undefined){
            return "No date received.";
        }
        if (date.match(/^[0-9]+$/) == null){
            return "Date can only contain digits.";
        }
        if (date.length !== 8){
            return "Improper length, date needs to be 8 characters";
        }
        if ((date.substring(0,4) > "2018") || (date.substring(0,4) < "2011")){
            return "Year is invalid.";
        }
        if (date.substring(4,6) > "12"){
            return "Month is invalid.";
        }
        if (date.substring(6,8) > "31"){
            return "Day is invalid.";
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

    /*
    Parser function which takes in the body response from the date API and retrieves all the
    players in all games.
    @param {Array of objects} gamesArray: contains all games with game information
    @return {Array of objects} players: array with all players stats on given day
    */
    getAllPlayers: function(gamesArray){
        const players = [];
        for (var i = 0; i < gamesArray.length; i++){
            const game = gamesArray[i];
            for (var j = 0; j < game.away_stats.length; j++){
                players.push(game.away_stats[j]);
            }
            for (var j = 0; j < game.home_stats.length; j++){
                players.push(game.home_stats[j]);
            }
        }
        return players;
    },

    /*
    Takes in an array of player objects and sorts it based on a particular mode: 
    "regular", "rebounds", "points", etc. Regular mode sort is different because
    of a custom rating system. Check stats.getPlayerRating()
    @param {Array of objects} playersArray
    @param {String} mode : "rebounds", "points", etc.
    */
    sortPlayersBy: function(playersArray, mode){
        if (mode === "regular"){
            const playerObjects = [];
            for (var i = 0; i < playersArray.length; i++){
                const playerObject = playersArray[i];
                const playerRating = stats.getPlayerRating(playerObject);
                playerObject.playerRating = playerRating;
                if (playerObject.playerRating != null){
                    playerObjects.push(playerObject);
                }
            }
            //Sort in descending order, highest first
            playerObjects.sort(function(a, b){
                return b.playerRating - a.playerRating;
            });
            return playerObjects;
        }
        if (playersArray[0][mode] != null && typeof playersArray[0][mode] !== "string"){
            playersArray.sort(function(a, b){
                return b[mode] - a[mode];
            })
            return playersArray;
        }
        return "Invalid mode. Mode either does not exist or is not quantifiable.";
        
    },

    buildGamesArray: function(body){
        "use strict";
        const gamesArray = [];
        for (var i = 0; i < body.length; i++){
            let game = {};
            game.event_id = body[i].event_id;
            game.away_team = body[i].away_team;
            game.home_team = body[i].home_team;
            game.away_period_scores = body[i].away_period_scores;
            game.home_period_scores = body[i].home_period_scores;
            game.away_totals = body[i].away_totals;
            game.home_totals = body[i].home_totals;
            gamesArray.push(game);
        }
        return gamesArray;
    }   
};

exports.tools = tools;