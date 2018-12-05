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
const postcss = require('gulp-postcss');
const nested = require('postcss-nested');
const postcssShort = require('postcss-short');
const assets = require('postcss-assets');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const handlebars = require('gulp-compile-handlebars');
const rename = require("gulp-rename");
const glob = require("glob");
const eslint = require('gulp-eslint');
const styleLint = require('stylelint');
const reporter = require('postcss-reporter');

const text = require("./src/test.json");
const jsLint = require("./eslintrc.json");
const cssLint = require("./stylelintrc.json");

const paths = {
    src: {
        dir: 'src',
        styles: 'src/css/**/*css',
        scripts: 'src/scripts/*js'
    },
    build: {
        dir: 'prod',
        styles: 'prod/css/',
        scripts: 'prod/scripts'
    },
    buildNames: {
        styles: 'style.min.css',
        scripts: 'script.min.js'
    },
    templates: 'src/templates/**/*.hbs',
    lint: {
        scripts: ['**/*.js', '!node_modules/**/*', '!prod/**/*'],
        style: ['**/*.css', '!node_modules/**/*', '!prod/**/*']

    }
};

env({
    file: '.env',
    type: 'ini',
});

gulp.task('jslint', () => {
    gulp.src(paths.lint.scripts)
        .pipe(eslint(jsLint))
        .pipe(eslint.format());
});

gulp.task('csslint', () => {
    gulp.src(paths.lint.style)
        .pipe(postcss([
            styleLint(cssLint),
            reporter({
                clearAllMessages: true,
                throwError: false
            })
        ]))
});

gulp.task('lint', ['jslint', 'csslint']);


gulp.task('compile', () => {
    glob(paths.templates, (err, files) => {
        if (!err) {
            const option = {
                ignorePartials: true,
                batch: files.map(item => item.slice(0, item.lastIndexOf('/'))),
                helpers: {
                    up: str => str.toUpperCase(),
                    copy: str => str + ' ' + str
                }
            };

            return gulp.src(`${paths.src.dir}/index.hbs`)
            .pipe(handlebars(text, option))
            .pipe(rename('index.html'))
            .pipe(gulp.dest(paths.build.dir));
        }
    });
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
    const plugins = [
        nested,
        postcssShort,
        assets ({
            loadPaths: ['src/css/images/'],
            relativeTo: 'src/css/'
        }),
        postcssPresetEnv({ stage: 0}),
        autoprefixer
    ];
    return gulp.src([paths.src.styles])
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
            .pipe(concat(paths.buildNames.styles))
            .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.styles));
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

