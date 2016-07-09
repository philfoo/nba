var stats = {
	getPlayerRating: function(playerObject){
		if (playerObject.minutes <= 5){
			return null;
		}

		var playerRating = 0;
		if (playerObject.points >= 10){
			playerRating++;
		}
		if (playerObject.points >= 20){
			playerRating++;
		}
		if (playerObject.points >= 30){
			playerRating++;
		}
		if (playerObject.rebounds >= 5){
			playerRating += 0.5;
		}
        if (playerObject.rebounds >= 10){
            playerRating += 0.5
        }
		if (playerObject.blocks >= 3){
			playerRating += 0.5;
		}
        if (playerObject.blocks >= 5){
            playerRating++;
        }
		if (playerObject.assists >= 5){
			playerRating += 0.5;
		}
        if (playerObject.assists >= 10){
            playerRating += 0.5
        }
		if (playerObject.steals >= 3){
			playerRating += 0.5;
		}
		if (playerObject.three_point_field_goals_made >= 5){
			playerRating += 0.5;
		}

		playerObject.playerRating = playerRating;
        return playerObject;
	}
}

module.exports = stats;