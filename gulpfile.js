const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('js', () => {
    return gulp.src('scripts/*js')
        .pipe(concat())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('prod/scripts'));
});

gulp.task('css', () => {
    return gulp.src('*css')
        .pipe(gulp.dest('prod/css'));
});