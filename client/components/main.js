var React = require('react');
var Button = require('react-bootstrap').Button;

var CommentBox = React.createClass({
	render: function(){
		return(
			<Button bsSize = "large">
				Hello, world!!!!!
			</Button>
		);
	}
});

ReactDOM.render(<CommentBox/>, document.getElementById('wrapper'));