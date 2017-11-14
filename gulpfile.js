//gulpfile.js

var gulp = require('gulp');
var sass = require('gulp-sass');

//style paths
var sassFiles = 'styles/sass/*.scss',
    cssDest = 'styles/css/';

gulp.task('styles', function(){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});

gulp.task('default', [ 'styles']);