const request = require('request');

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
		console.log(body);
	}
});