var React = require('react');
var Panel = require('react-bootstrap/lib/Panel');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var MainContent = React.createClass({
  render: function(){
    return(
      <div className = "main-content">
          <Grid fluid = "true">
            <Row className = "player-row">
                <Panel bsStyle = "info" header = "Top Performers" className = "players-panel">
                  {this.props.date || "No date specified"}
                </Panel>
            </Row>
            <Row className = "lower-row">
              <Col md = {8}>
                <Panel header = "Videos" bsStyle = "success" className = "videos-panel">
                  <iframe width="600" height="400" src="https://www.youtube.com/embed/-gQRlUHB1vU" frameBorder="0" allowFullScreen = "allowfullscreen"></iframe>
                </Panel>
              </Col>

              <Col md = {4}>
                <Panel header="Reddit News" bsStyle="danger" className = "reddit-panel">
                  Cool Reddit links
                </Panel>
              </Col>

            </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = MainContent;