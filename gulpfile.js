/* jshint strict: false */

var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var stylish    = require('jshint-stylish');
var react      = require('gulp-react');
var mocha      = require('gulp-spawn-mocha');
var istanbul   = require('gulp-istanbul');
var coveralls  = require('gulp-coveralls');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var streamify  = require('gulp-streamify');
var source     = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify   = require('watchify');
var reactify   = require('reactify');
var babel      = require('gulp-babel');

// registers global require hook that transpiles all commonjs required .es6, .es, .jsx and .js files
// cannot use with gulp-jsx-coverage task creator
// require('babel/register') 

// Run Linting with JSHint
// ==================================
gulp.task('lint', function () {
  gulp.src(['./+(client|server)/**/!(build)/*.{js,jsx}'])
    .pipe(babel())
    .on('error', console.log.bind(console))
    .pipe(jshint())
    .pipe(jshint.reporter( stylish ));
});


// Run Unit Tests with Coverage
// ==================================
gulp.task('test', require('gulp-jsx-coverage').createTask({
    src: ['client/**/*.tests.{jsx,js}'],  // will pass to gulp.src
    istanbul: {                                      // will pass to istanbul
        coverageVariable: '__MY_TEST_COVERAGE__',
        exclude: /node_modules|\/test-helpers|\.tests\.(js|jsx)$/            // pattern to skip instrument
    },
    coverage: {
        reporters: ['text', 'text-summary', 'json', 'lcov'], // list of istanbul reporters
        directory: 'coverage'                        // will pass to istanbul reporters
    },
    mocha: {                                         // will pass to mocha
        reporter: 'spec'
    },
    babel: {                                         // will pass to babel
        sourceMap: 'inline'                          // get hints in HTML covarage reports
    },

    //optional
    cleanup: function () {
        // do extra tasks after test done
        // EX: clean global.window when test with jsdom
    }
}));


// Send Coverage Data to Coveralls
// ====================================
gulp.task('coveralls', function(){
  return gulp.src('./coverage/lcov.info')
  .pipe(coveralls());
});


// Watch & Build Client JS Bundle
// ====================================
gulp.task('browserify', function() {
  var bundler = browserify({
    entries: ['./client/app/app.jsx'], // Only need initial file, browserify finds the deps
    transform: [reactify], // We want to convert JSX to normal javascript
    debug: true, // Gives us sourcemapping
    cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  });
  var watcher  = watchify(bundler);

  return watcher
  .on('update', function () { // When any files update
    var updateStart = Date.now();
    console.log('Updating!');
    watcher.bundle() // Create new bundle that uses the cache for high performance
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./client/app/build/'));
    console.log('Updated!', (Date.now() - updateStart) + 'ms');
  })
  .bundle() // Create the initial bundle when starting the task
  .pipe(source('bundle.js'))
  .pipe(streamify(uglify()))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./client/app/build/'));
});