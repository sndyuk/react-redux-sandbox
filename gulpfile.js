const
  gulp = require('gulp'),
  gutil = require("gulp-util"),
  pug = require('gulp-pug'),
  del = require('del'),
  rename = require('gulp-rename'),
  theo = require('theo'),
  sequence = require('gulp-sequence');

gulp.task('pug', function() {
  return gulp.src('src/view/*.pug')
  .pipe(pug({
  }))
  .pipe(gulp.dest('build'));
});

gulp.task('theo-sass', function() {
  gulp.src('src/design/variables.json')
  .pipe(theo.plugins.transform('web'))
  .pipe(theo.plugins.format('scss'))
  .pipe(rename('_variables.scss'))
  .pipe(gulp.dest('src/style/foundation/'))
});

gulp.task('image', function() {
  return gulp.src(['assets/images/**/*'])
    .pipe(gulp.dest('build/images'));
});

gulp.task('clean', del.bind(null, ['build']));

gulp.task('build', sequence('clean', 'theo-sass', ['pug', 'image']));

gulp.task('watch', function() {
  gulp.watch('src/design/**/*.json', ['theo-sass']);
  gulp.watch('src/view/**/*.pug', ['pug']);
  gulp.watch('src/image/**/*', ['image']);
});
