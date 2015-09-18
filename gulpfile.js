/**
 * Gulp File
 *
 * 1) Make sure you have node and npm installed locally
 *
 * 2) Install all the modules:
 * $ npm install --save-dev gulp orchestrator del gulp-rename gulp-uglify gulp-minify-css
 *
 * 3) Run gulp to mifiy javascript and css using the 'gulp' command.
 */

var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var chmod = require('gulp-chmod');
var del = require('del');

var paths = {
    scripts: ['assets/js/*.js' ],
    adminScripts: ['assets/js/admin/*.js'],
    frontendScripts: ['assets/js/frontend/*.js'],
    css: ['assets/css/*.css'],
    sass: ['assets/css/*.scss'],
    frontendSass: ['assets/css/frontend/*.scss'],
};

gulp.task('clean', function(cb) {
    del( ['assets/js/*.min.js','assets/js/admin/*.min.js','assets/js/frontend/*.min.js', 'assets/css/*.min.css'], cb );

});

gulp.task('default', [ 'sass','frontendSass', 'CSS','JS','frontendJS','adminJS' ] );

gulp.task('JS',['clean'], function(){
    return gulp.src( paths.scripts )
        // This will minify and rename to *.min.js
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(chmod(644))
        .pipe( gulp.dest( 'assets/js' ));
});

gulp.task('frontendJS',['clean'], function(){
    return gulp.src( paths.frontendScripts )
        // This will minify and rename to *.min.js
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(chmod(644))
        .pipe( gulp.dest( 'assets/js/frontend' ));
});

gulp.task('adminJS',['clean'], function(){
    return gulp.src( paths.adminScripts )
        // This will minify and rename to *.min.js
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(chmod(644))
        .pipe( gulp.dest( 'assets/js/admin' ));
});

gulp.task('sass', function () {
    return gulp.src( paths.sass )
        .pipe(sass().on('error', sass.logError))
        .pipe(chmod(644))
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('frontendSass', function () {
    return gulp.src( paths.frontendSass )
        .pipe(sass().on('error', sass.logError))
        .pipe(chmod(644))
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(gulp.dest('assets/css/frontend'));
});