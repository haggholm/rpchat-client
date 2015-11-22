'use strict';

const path = require('path');

const _ = require('lodash');

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const gutil = require('gulp-util');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const browserify = require('browserify');
const babelify = require('babelify');
const browserSync = require('browser-sync');
const envify = require('envify');
const uglifyify = require('uglifyify');
const watchify = require('watchify');


var production = process.env.NODE_ENV === 'production';


function handleError(task) {
  return (err) => {
    gutil.log(gutil.colors.red(err));
    notify.onError(`${task} failed, check the logs`)(err);
  };
}



gulp.task('browserify', () => scripts(true));
gulp.task('scripts', () => scripts(false));


function scripts(watch) {
  let bundler = browserify({
    basedir: path.resolve(path.join(__dirname, '..')),
    debug: !production,
    entries: './src/index.js',
    cache: {},
    packageCache: {},
    fullPaths: watch
  });

  if (watch) {
    bundler = watchify(bundler);
  }

  bundler.transform(babelify);
  bundler.transform(envify, {global: true});

  if (production) {
    bundler.transform(uglifyify, {global: true});
  }

  let rebundle = function() {
    let stream = bundler.bundle();
    stream.on('error', handleError('Browserify'));

    stream = stream.pipe(source('index.js'));

    //if (production) {
    //  stream.pipe(gStreamify(uglify()));
    //}

    return stream
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'))
      .pipe(gulpIf(browserSync.active, browserSync.reload({ stream: true, once: true })));
  };

  bundler.on('update', rebundle);
  return rebundle();
}
