const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano')

gulp.task('build', ['js', 'css']);

gulp.task('js', () => {
    return gulp.src('scripts/*js')
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('prod/scripts'));
});

gulp.task('css', () => {
    return gulp.src('css/*css')
        .pipe(concat('index.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('prod/css'));
});