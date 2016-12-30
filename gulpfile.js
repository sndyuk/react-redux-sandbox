const
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  gutil = require("gulp-util"),
  pug = require('gulp-pug'),
  del = require('del'),
  rename = require('gulp-rename'),
  theo = require('theo'),
  sequence = require('gulp-sequence'),
  jshint = require('gulp-jshint');

gulp.task('pug', function() {
  return gulp.src('src/view/*.pug')
  .pipe(plumber())
  .pipe(pug({
  }))
  .pipe(gulp.dest('build'));
});

gulp.task('theo-sass', ['lint-theo'], function() {
  return gulp.src('src/design/variables.json')
  .pipe(plumber())
  .pipe(theo.plugins.transform('web'))
  .pipe(theo.plugins.format('scss'))
  .pipe(rename('_variables.scss'))
  .pipe(gulp.dest('src/style/foundation/'))
});

gulp.task('image', function() {
  return gulp.src(['assets/images/**/*'])
    .pipe(plumber())
    .pipe(gulp.dest('build/images'));
});

gulp.task('lint-theo', function() {
  return gulp.src('src/design/**/*.json')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    
});


gulp.task('clean', del.bind(null, ['build']));

gulp.task('build', sequence('clean', 'lint-theo', 'theo-sass', ['pug', 'image']));

gulp.task('watch', function() {
  gulp.watch('src/design/**/*.json', ['theo-sass']);
  gulp.watch('src/view/**/*.pug', ['pug']);
  gulp.watch('src/image/**/*', ['image']);
});
