var tools = {
	checkValidDate: function(date){
		if (date.length !== 8){
			return "Improper Length, date needs to be 8 characters";
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
};

exports.tools = tools;