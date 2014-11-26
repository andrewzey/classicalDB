/* jshint quotmark: false */
//necessary because compiled jsx uses doublequotes for strings

var React       = require('react');
var App         = require('./components/app/app.component.jsx');
var WebAPIUtils = require('./utils/WebAPIUtils');

// Load API Call
// WebAPIUtils.getAllLabels();

//Render App Component
React.render(<App />, 
  document.getElementById('react')
);
