'use strict';

var React = require('react');
// var LabelSection = require('../labelSection/labelSection.component.jsx');

var App = React.createClass({
  someFunction: ()=> {
    return 'hello!'
  },
  render: function() {
    return (
      <div className="app">
        Hello!
      </div>
    );
  }
});

module.exports = App;

// add <LabelSection /> under Hello!