'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');


gulp.task('browser-sync', function() {
  browserSync({ server: './dist' });
});

exports.reload = browserSync.reload;
