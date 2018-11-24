const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', () => {
    return gulp.src('scripts/*js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('prod/scripts'));
});

gulp.task('css', () => {
    return gulp.src('*css')
        .pipe(gulp.dest('prod/css'));
});