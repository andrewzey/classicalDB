/**
* Using Rails-like standard naming convention for endpoints.
* GET     /labels              ->  index
* POST    /labels              ->  create
* GET     /labels/:id          ->  show
* PUT     /labels/:id          ->  update
* DELETE  /labels/:id          ->  destroy
*/

'use strict';

// var _ = require('lodash');
var app = require('../../app');
var Label = app.get('database').getModel('labels/label.model');

// Get list of labels
exports.index = function(req, res) {
  Label.findAll()
  .then(function(labels) {
    if(!labels) { return res.send(404); }
    res.send(labels);
  })
  .catch(function(err) {
    console.log('Error: ', err);
  });
};

// Get a single label
exports.show = function(req, res) {
  Label.find(req.params.id)
  .then(function (label) {
    if(!label) { return res.send(404); }
    res.json(label);
  })
  .catch(function(err) {
    console.log('Error: ', err);
  });
};

// Creates a new label in the DB.
exports.create = function(req, res) {
  var body = req.body;
  var labelName = body.label;
  // var labelDefunct = body.labelDefunct;
  // var labelCountry = body.labelCountry;

  Label.create({
    label_name: labelName,
    label_defunct_date: 1997,
    label_country: 'Slovakia'
  })
  .then(function(labelName) {
    res.send(labelName);
  })
  .catch(function(err) {
    console.log('Error: ', err);
  });
  // res.send(labelName);
};

// // Updates an existing label in the DB.
// exports.update = function(req, res) {
//   if(req.body._id) { delete req.body._id; }
//   Thing.findById(req.params.id, function (err, thing) {
//     if (err) { return handleError(err); }
//     if(!thing) { return res.send(404); }
//     var updated = _.merge(thing, req.body);
//     updated.save(function (err) {
//       if (err) { return handleError(err); }
//       return res.json(200, thing);
//     });
//   });
// };
//
// // Deletes a label from the DB.
// exports.destroy = function(req, res) {
//   Thing.findById(req.params.id, function (err, thing) {
//     if(err) { return handleError(res, err); }
//     if(!thing) { return res.send(404); }
//     thing.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };
//
// function handleError(res, err) {
//   return res.send(500, err);
// }
