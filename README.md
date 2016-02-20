# Gulp Accessibility
[![Build Status](https://travis-ci.org/yargalot/gulp-accessibility.svg?branch=master)](https://travis-ci.org/yargalot/gulp-accessibility)

Uses [AccessSniff](https://github.com/yargalot/AccessSniff) and [HTML Codesniffer](http://github.com/squizlabs/HTML_CodeSniffer) to grade your sites accessibility using different levels of the WCAG guidelines

![Gulp Accessibility example](/img/example.png)

## Getting Started
Install this gulp plugin next to your project's gulpfile with: `npm install gulp-accessibility --save-dev`

Then add this line to your project's `gulpfile.js` gulpfile:

```javascript
var access = require('gulp-accessibility');
```

## Documentation
Place this in your gulp file.

```javascript
gulp.task('test', function() {
  return gulp.src('./example/**/*.html')
    .pipe(access({
      force: true
    }))
    .on('error', console.log)
    .pipe(access.report({reportType: 'txt'}))
    .pipe(rename({
      extname: '.txt'
    }))
    .pipe(gulp.dest('reports/txt'));
});

```

## Report Generation
You can link to the files you wish to lint using the gulp api

You'll need to add the below to convert into other formats
```
.pipe(access.report({reportType: 'txt'}))
```

## Options
View [AccessSniff](https://github.com/yargalot/AccessSniff) options for all available options.  

## License
Copyright (c) 2015 Steven Miller
Licensed under the MIT license.
