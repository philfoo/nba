var React = require('react');
var Navbar = require('react-bootstrap/lib/Navbar');

var Title = React.createClass({
	render: function(){
		return(
			<Navbar fluid = "true">
				<Navbar.Header>
					<Navbar.Brand pullLeft>The Full Court Press</Navbar.Brand>
				</Navbar.Header>
			</Navbar>
		);
	}
});

module.exports = Title;