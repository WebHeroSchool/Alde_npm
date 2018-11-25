const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const env = require('gulp-env');
const clean = require('gulp-clean');

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

env({
    file: '.env',
    type: 'ini',
});

gulp.task('js', () => {
    return gulp.src([paths.src.scripts])
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.scripts))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.scripts));
});

gulp.task('css', () => {
    return gulp.src([paths.src.styles])
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.styles))
            .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.styles))
});

gulp.task('build', ['js', 'css']);

gulp.task('sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(paths.src.scripts, ['js-watch']);
    gulp.watch(paths.src.styles, ['css-watch']);
});

gulp.task('js-watch', ['js'], () => browserSync.reload());
gulp.task('css-watch', ['css'], () => browserSync.reload());
gulp.task('clean', () => {
    return gulp.src('prod', {read: false})
        .pipe(clean());
});


gulp.task('prod', ['build']);
gulp.task('dev', ['build', 'sync']);

