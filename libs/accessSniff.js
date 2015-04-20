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

  var gulpOptions = options ? options : {
    ignore: [],
    verbose: true,
    force: false,
    domElement: true,
    reportType: null,
    reportLocation : 'reports',
    accessibilityrc: false,
    accessibilityLevel: 'WCAG2A',
  };

  var emailBuilder = new EmailBuilderCore(options);

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      // return empty file
      cb(null, file);
    }

    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Cannot read strams');
    }

    if (file.isBuffer()) {
      accessSniff.start(file.path, options, cb);
    }

  });

}

// Exporting the plugin main function
module.exports = gulpAccessibility;
