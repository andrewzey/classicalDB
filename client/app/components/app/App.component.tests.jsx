var expect = require('chai').expect;

// Create a fake global `window` and `document` object:
// Note: This must be required before React
require('../../../../test-helpers/testdom')('<html><body></body></html>');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe('App Component', ()=> {
  // Require React Component that we will be testing
  var App = require('./App.component.jsx');

  // Define variables that we will be re-using in unit tests
  var app;
  var div;

  beforeEach(function(){

    // Render the App Component into the DOM
    app = TestUtils.renderIntoDocument(
      <App />
    );

    // Create reference to div whose output we will be testing
    div = TestUtils.findRenderedDOMComponentWithTag(app, 'div');
  });

  it('renders the hello world text correctly', function() {
    expect(div.getDOMNode().textContent).to.equal('Hello!');
  });
});