var React = require('react');
var ReactDOM = require('react-dom');
var Title = require('./components/title.js');
var MainWrapper = require('./components/main-wrapper.js');

var date = document.getElementById('date').innerHTML;

ReactDOM.render(<Title/>, document.getElementById('content'));
ReactDOM.render(<MainWrapper date = {date}/>, document.getElementById('wrapper'));