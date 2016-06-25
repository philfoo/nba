const request = require('request');
const MongoClient = require('mongodb').MongoClient;


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

request.get({
    url: 'https://erikberg.com/nba/boxscore/20120621-oklahoma-city-thunder-at-miami-heat.json',
    headers: {
        'Authorization': 'Bearer ' + process.env.TOKEN,
        'User-Agent': 'philip.foo@duke.edu'
    }
}, function(error, response, body){
    if(error){
        console.log(error);
    }else{
        console.log(JSON.parse(body));
    }
});

