// const {src, dest, watch} = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('sass', function(){
    return gulp.src('css/**/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('js', function(){
    return gulp.src('app/**/*.js')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('useref', function(){
    return gulp.src('./*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: '.'
        },
    })
})

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
})

gulp.task('watch', ['browserSync', 'sass' ,'js'], function (){
    gulp.watch('css/**/*.scss',  ['sass']);
    gulp.watch('src/js/**/*.js',  ['js']);
});

gulp.task('build', function (callback) {
    runSequence('clean:dist',
        ['sass', 'useref', 'images', 'fonts'],
        callback
    )
})

gulp.task('default', function (callback) {
    runSequence(['sass','browserSync', 'watch'],
        callback
    )
})
