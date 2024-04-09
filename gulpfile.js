import gulp from 'gulp';
import browserSync from 'browser-sync';
import gulpSass from "gulp-sass";
import nodeSass from "sass";
    
const sass = gulpSass(nodeSass);
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from "gulp-rename";

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
});

gulp.task('styles', function(){
    return gulp.src('src/sass/*.+(scss|sass)')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename ({ 
                prefix: '',
                suffix: '.main',
            }))
            .pipe(autoprefixer('last 2 versions'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('src/css'))
            .pipe(browserSync.stream());
});

gulp.task('watch', function() {
        gulp.watch('src/sass/*.+(scss|sass)', gulp.parallel('styles'))
        gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));