var React = require('react');
var Button = require('react-bootstrap').Button;

var CommentBox = React.createClass({displayName: "CommentBox",
	render: function(){
		return(
			React.createElement(Button, {bsSize: "large"}, 
				"Hello, world!!!!!"
			)
		);
	}
});

ReactDOM.render(React.createElement(CommentBox, null), document.getElementById('wrapper'));