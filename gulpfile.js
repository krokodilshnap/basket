var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    rename = require('gulp-rename'),
    cssNano = require('gulp-cssnano'),
    browserSync = require('browser-sync'),
    concatJs = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace');

gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions'], {cascade: true}))
        .pipe(gcmq())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});



gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./app/"
        },
        notify: true
    });
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('plugin-css', function() {
    return gulp.src('app/scss/smartBasket.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions'], {cascade: true}))
        .pipe(gcmq())
        .pipe(gulp.dest('app/css'))
});

gulp.task('watch', ['browser-sync', 'sass', 'plugin-css'], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/*.js', browserSync.reload);

});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['img', 'clean', 'sass'], function () {

    var buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
});


gulp.task('svgSpriteBuild', function () {
    return gulp.src('./app/img/icons/*.svg')
    // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill, style and stroke declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '&gt;', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    render: {
                        scss: {
                            dest:'../../../scss/helpers/_sprite.scss',
                            template: "./app/scss/helpers/_sprite_template.scss"
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest('./app/img/sprite/'));
});