'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence');

require('./gulp/browserify');
require('./gulp/browser-sync');
require('./gulp/clean');

gulp.task('html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./dist'));
})

gulp.task('default', (cb) => {
  runSequence('clean', ['browserify', 'html'], ['browser-sync'], cb);
});
