var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

var styleSrc = 'src/styles/**/*.sass',
    styleDest = 'dist/assets/styles',
    htmlDest = 'dist/*.html',
    jsSrc = 'src/app/**/*.js',
    jsDest = 'dist/assets/app'

gulp.task('default', ['serve']);

gulp.task('build-css', function(){
    return gulp.src(styleSrc)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(styleDest));
});

gulp.task('compile-js', function(){
    return gulp.src(jsSrc).pipe(gulp.dest(jsDest));
})

gulp.task('serve', ['build-css', 'compile-js'], function(){
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        notify: false
    });
    
    gulp.watch(styleSrc, ['build-css']);
    gulp.watch(jsDest, ['compile-js']);
    gulp.watch([htmlDest, jsDest + '/*.js', styleDest + '/*.css']).on('change', browserSync.reload);
})