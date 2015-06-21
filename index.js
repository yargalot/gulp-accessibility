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

    if (file.isBuffer()) {
      accessSniff.start(files, gulpOptions, function(messageLog, err) {

        if (options.force) {
          err = 0;
        }

        return cb(null, messageLog);
      });
    }

  });

}

// Exporting the plugin main function
module.exports = gulpAccessibility;
