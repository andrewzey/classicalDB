'use strict';

//TODO: refactor to use singleton instance instead of global variable
//TODO: add script to import all **/*.model.js files in 'api' directory

var singleton = (function () {

  var instance;

  var init = function () {

    var Sequelize = require('sequelize');
    var config    = require('./environment');
    var sequelize;

    if ('production' === config.env) {
      var match = config.postgres.uri.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

      sequelize = new Sequelize(match[5], match[1], match[2], {
        host: match[3],
        port: match[4],
        protocol: 'postgres',
        dialect: 'postgres',
        sync: { force: false }
      });

    } else {
      // console.log(config.postgres);
      sequelize = new Sequelize(config.postgres.dbname, config.postgres.username, config.postgres.password, {
        host: 'localhost',
        port: 5432,
        protocol: 'postgres',
        dialect: 'postgres',
        sync: { force: true }
      });
    }
    
    return {
      getModel: function(path) {
        return sequelize.import(config.root + '/server/api/' + path);
      },
      sequelize: sequelize
    };

  };

  return {

    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };


})();

  // global.db.track.hasMany(global.db.cd);
  // global.db.cd.belongsTo(global.db.track);

  // global.db.label.hasMany(global.db.labelCode);
  // global.db.labelCode.belongsTo(global.db.label);

  // global.db.labelCode.hasOne(global.db.cd);
  // global.db.cd.belongsTo(global.db.labelCode);
  //
  // global.db.recording.hasMany(global.db.track);
  // global.db.track.belongsTo(global.db.recording);
  //
  // global.db.person.hasOne(global.db.track, {foreignKey: 'track_mastering_engineer'});
  // global.db.track.belongsTo(global.db.person, {foreignKey: 'track_mastering_engineer'});
  //
  // global.db.person.hasOne(global.db.recording, {foreignKey: 'recording_engineer'});
  // global.db.recording.belongsTo(global.db.person, {foreignKey: 'recording_engineer'});
  //
  // global.db.person.hasMany(global.db.recording, {foreignKey: 'recording_soloist'});
  // global.db.recording.belongsTo(global.db.person, {foreignKey: 'recording_soloist'});
  //
  // global.db.performance.hasOne(global.db.recording);
  // global.db.recording.belongsTo(global.db.performance);
  //
  // global.db.movement.hasMany(global.db.performance);
  // global.db.performance.belongsTo(global.db.movement);
  //
  // global.db.person.hasOne(global.db.soloist, {foreignKey: 'soloist_performer'});
  // global.db.soloist.belongsTo(global.db.person, {foreignKey: 'soloist_performer'});
  //
  // global.db.performance.hasOne(global.db.soloist, {foreignKey: 'soloist_performance'});
  // global.db.soloist.belongsTo(global.db.performance, {foreignKey: 'soloist_performance'});
  //
  // global.db.person.hasOne(global.db.composition, {foreignKey: 'composition_composer'});
  // global.db.composition.belongsTo(global.db.person, {foreignKey: 'composition_composer'});
  //
  // global.db.movement.hasMany(global.db.composition);
  // global.db.composition.belongsTo(global.db.movement);
  //
  // global.db.composition.hasMany(global.db.catalog);
  // global.db.catalog.belongsTo(global.db.composition);


module.exports = singleton.getInstance();
