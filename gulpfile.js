const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    src: {
        styles: 'src/css/*css',
        scripts: 'src/scripts/*js'
    },
    build: {
        styles: 'prod/css/',
        scripts: 'prod/scripts'
    },
    buildNames: {
        styles: 'style.min.css',
        scripts: 'script.min.js'
    }
}


gulp.task('default', ['js', 'css']);

gulp.task('js', () => {
    return gulp.src([paths.src.scripts])
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.scripts))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.scripts));
});

gulp.task('css', () => {
    return gulp.src([paths.src.styles])
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.styles))
            .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.styles));
});

gulp.task('watch', () => {
    gulp.watch(paths.src.scripts, ['js'])
    gulp.watch(paths.src.styles, ['css'])
});