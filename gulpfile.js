const gulp = require('gulp');

gulp.task('js', () => {
    return gulp.src('*js')
        .pipe(gulp.dest('prod/script'));
});

gulp.task('css', () => {
    return gulp.src('*css')
        .pipe(gulp.dest('prod/css'));
});