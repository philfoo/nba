var stats = {
	calculatePlayerRating: function(playerObject){
		if (playerObject.minutes <= 5){
			return null;
		}

		var playerRating = 0;
		var notableStats = {
			name: playerObject.display_name,
			minutes: playerObject.minutes
		};
		if (playerObject.points >= 10){
			playerRating++;
			notableStats.points = playerObject.points;
		}
		if (playerObject.points >= 20){
			playerRating++;
		}
		if (playerObject.points >= 30){
			playerRating++;
		}
		if (playerObject.rebounds >= 10){
			playerRating++;
			notableStats.rebounds = playerObject.rebounds;
		}
		if (playerObject.blocks >= 5){
			playerRating++;
			notableStats.blocks = playerObject.blocks;
		}
		if (playerObject.assists >= 8){
			playerRating++;
			notableStats.assists = playerObject.assist;
		}
		if (playerObject.steals >= 3){
			playerRating += 0.5;
			notableStats.steals = playerObject.steals;
		}
		if (playerObject.field_goal_percentage >= 0.47){
			playerRating += 0.5;
			notableStats.field_goal_percentage = playerObject.field_goal_percentage;
			notableStats.field_goals_attempted = playerObject.field_goals_attempted;
			notableStats.field_goals_made = playerObject.field_goals_made;
		}
		if (playerObject.three_point_field_goals_made >= 5){
			playerRating += 0.5;
			notableStats.three_pointers_made = playerObject.three_point_field_goals_made;
		}

		if (playerRating > 2){
			return notableStats;
		}else{
			return null;
		}
	}
}

exports.stats = stats;