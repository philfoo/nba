var React = require('react');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var LeftSidebar = require('./left-sidebar.js');
var MainContent = require('./main-content.js');

var MainWrapper = React.createClass({
  componentDidMount: function(){
    console.log(this.props.date);
  },

  render: function(){
    return(
      <Grid fluid = "true">
        <Row>
          <Col md = {2}>
            <LeftSidebar/>
          </Col>
          <Col md = {10}>
            <MainContent date = {this.props.date}/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = MainWrapper;