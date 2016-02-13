//
// Gulp AccessSniff Task
// ------------------------

// through2 is a thin wrapper around node transform streams
const _ = require('lodash');
const gutil = require('gulp-util');
const through = require('through2');
const accessSniff = require('access-sniff');

const PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-accessibility';

function gulpAccessibility(options) {
  const gulpOptions = options ? options : {};

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, callback) {

    if (file.isNull()) {
      cb(null, file);
    }

    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Cannot read streams');
    }

    if (file.isBuffer()) {
      return accessSniff
        .default(file.path, gulpOptions)
        .then(function(response) {

          var err = 0;

          _.each(response, function(data) {
            data.forEach(function(data) {
              if (data.heading === 'ERROR') {
                err ++;
              }
            })
          });

          if (gulpOptions.force) {
            err = 0;
          }

          var error = null;

          if (err > 0) {
            error = new Error('at least ' + err + ' errors found when check accessibility');
          }

          file.contents = new Buffer(JSON.stringify(response));

          return callback(error, file);

        });
    }

  });

}

// Exporting the plugin main function
module.exports = gulpAccessibility;
