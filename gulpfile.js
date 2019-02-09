'use strict';

const gulp = require('gulp'),
    path = require('path'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat');

//browser sync
const browserSync  = require('browser-sync').create();
//styles
const postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    atImport = require('postcss-import'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');
//js
const babel = require('gulp-babel');
// file include
const fileinclude = require('gulp-file-include');
//path
const app = {
    base: __dirname
};

app.srcScss = path.join(app.base, 'src/scss');
app.destCss = path.join(app.base, 'destr/css');
app.srcJs = path.join(app.base, 'src/js');
app.destrJs = path.join(app.base, 'destr/js');
app.srcLayouts = path.join(app.base, 'src/layouts');

// common livereload
gulp.task('watch', function () {
    browserSync.init({
        server: app.base + '/destr',
        port: '10000',
        notify: false,
        watch: true,
        injectChanges: true,
        // startPath: './*.html'
        startPath: 'index.html'
    });

    gulp.watch(['./src/scss/**/*.scss'], gulp.series('scss'));
    gulp.watch(['./src/js/**/*.js'], gulp.series('js'));
    gulp.watch(['./destr/img/**/*.*'], gulp.series('reload'));
    gulp.watch(['./src/layouts/**/*.html'], gulp.series('fileinclude', 'reload'));

});

gulp.task('reload', function (callback) {
    browserSync.reload();
    callback();
});

gulp.task('cleancss', function () {
    return del(app.destCss + '/**/*.css');
});

//compile scss to css
gulp.task('scss', function () {
    return gulp.src(app.srcScss + '/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ['node_modules/']
        })).on('error', sass.logError)
        //adding auto-prefixes, minimization and optimization css
        .pipe(postcss([
            autoprefixer({browsers: ["last 5 versions", "IE 10"],}),
            atImport(),
            mqpacker(),
            cssnano()
        ]))
        .pipe(debug({title: 'compile:'}))
        .pipe(sourcemaps.write('.', {
            includeContent: false
        }))
        .pipe(gulp.dest(app.destCss))
        .pipe(browserSync.stream());
});

//js task
gulp.task('js', function () {
    return gulp.src(app.srcJs + '/*.js')
        .pipe(babel({
            presets: ['@babel/env'],
            minified: true,
            sourceMap: 'map'
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(app.destrJs))
        .pipe(browserSync.stream());
});

//gulp file include
gulp.task('fileinclude', function () {
    return gulp.src([app.base + '/src/layouts/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(app.base + '/destr'))
        .pipe(browserSync.stream());
});

//default task
gulp.task('default',
    gulp.series('cleancss', 'fileinclude', 'scss', 'js',
        gulp.parallel('watch')
    )
);