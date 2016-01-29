//
// Gulp AccessSniff Task
// ------------------------

// through2 is a thin wrapper around node transform streams
var gutil = require('gulp-util');
var through = require('through2');
var accessSniff = require('access-sniff');

var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-accessibility';

// Plugin level function(dealing with files)
function gulpAccessibility(options) {

  var gulpOptions = options ? options : {};

  if (gulpOptions.urls) {
    return accessSniff.start(gulpOptions.urls, gulpOptions, function(messageLog, err) {

      if (gulpOptions.force) {
        err = 0;
      }

      return messageLog;
    });
  }

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {

    var files = [];
    files.push(file.path);

    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }

    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Cannot read streams');
    }

    console.log(files);

    if (file.isBuffer()) {
      accessSniff.start(files, gulpOptions, function(messageLog, err) {

        if (gulpOptions.force) {
          err = 0;
        }

        var error = null;
        if (err > 0) {
          error = new Error('at least ' + err + ' errors found when check accessibility')
        }

        return cb(error, messageLog);
      });
    }

  });

}

// Exporting the plugin main function
module.exports = gulpAccessibility;
