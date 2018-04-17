//
// Gulp AccessSniff Task
// ------------------------

// through2 is a thin wrapper around node transform streams
const through = require('through2');
const accessSniff = require('access-sniff');
const StringDecoder = require('string_decoder').StringDecoder;
const PluginError = require('plugin-error');

// Consts
const PLUGIN_NAME = 'gulp-accessibility';

var accessSniffPlugin = function(options) {
  const gulpOptions = options ? options : {};

  // Creating a stream through which each file will pass
  return through.obj(function(file, enc, callback) {

    if (file.isNull()) {
      callback(null, file);
    }

    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Cannot read streams');
    }

    if (file.isBuffer()) {
      return accessSniff
        .default(file.path, gulpOptions)
        .then(function(response) {
          file.contents = new Buffer(JSON.stringify(response));

          return callback(null, file);
        })
        .catch(function(result) {
          var error = new Error(result.errorMessage);

          file.contents = new Buffer(JSON.stringify(result.reportLogs));

          return callback(error, file);
        });
    }

  });

};

accessSniffPlugin.report = function(options) {
  const gulpOptions = options ? options : {};
  const decoder = new StringDecoder('utf8');

  return through.obj(function(file, enc, callback) {

    if (file.isNull()) {
      callback(null, file);
    }

    if (file.isStream()) {
      throw new PluginError(PLUGIN_NAME, 'Cannot read streams');
    }

    if (file.isBuffer()) {
      const fileContents = decoder.write(file.contents);
      const jsonContent = JSON.parse(fileContents);

      var reportData = accessSniff.report(jsonContent, gulpOptions);

      file.contents = new Buffer(reportData);

      return callback(null, file);

    }
  });
};

// Exporting the plugin main function
module.exports = accessSniffPlugin;
