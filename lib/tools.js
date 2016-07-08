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


};

exports.tools = tools;