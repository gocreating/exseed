var gulp = require('gulp');
var changed = require('gulp-changed');
var babel = require('gulp-babel');

// watching source files
gulp.task('watch', function() {
  return gulp
    .watch('./src/**/*.js', ['build']);
});

// build source files
gulp.task('build', function() {
  return gulp
    .src('./src/**/*.js')
    .pipe(changed('./'))
    .pipe(babel({
      presets: [
        'es2015',
        'stage-0',
        'stage-1',
      ],
    }))
    .pipe(gulp.dest('./'));
});

// run gulp tasks
gulp.task('default', function() {
  gulp.start('build', 'watch');
});