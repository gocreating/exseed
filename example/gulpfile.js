var gulp = require('gulp');
var changed = require('gulp-changed');
var babel = require('gulp-babel');

var errorHandler = function(err) {
  console.log(err.toString());
  this.emit('end');
};

// watching source files
gulp.task('watch', function() {
  return gulp
    .watch('./src/**/*.js', ['build']);
});

// build source files
gulp.task('build', function() {
  return gulp
    .src('./src/**/*.js')
    .pipe(changed('./build/debug'))
    .pipe(babel({
      presets: [
        'es2015',
        'stage-0',
        'stage-1',
      ],
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest('./build/debug'));
});

// run gulp tasks
gulp.task('default', function() {
  gulp.start('build', 'watch');
});