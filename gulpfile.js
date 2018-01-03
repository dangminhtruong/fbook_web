var gulp = require('gulp');
var css = [
    'resources/assets/css/**'
];
var font = [
    'resources/assets/fonts/**'
];
var js = [
    'resources/assets/javascripts/**'
];

var img = [
    'resources/assets/images/**'
];

var doc = [
    'resources/assets/documents/**'
];

var bs4 = [
    'node_modules/bootstrap/**'
];

gulp.task('css', function () {
    return gulp.src(css)
    .pipe(gulp.dest('public/css/'));
});

gulp.task('font', function () {
    return gulp.src(font)
    .pipe(gulp.dest('public/fonts/'));
});

gulp.task('img', function () {
    return gulp.src(img)
    .pipe(gulp.dest('public/images/'));
});

gulp.task('js', function () {
    return gulp.src(js)
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('doc', function () {
    return gulp.src(doc)
    .pipe(gulp.dest('public/documents/'));
});

gulp.task('bs4', function () {
    return gulp.src(bs4)
    .pipe(gulp.dest('public/bower/bootstrap4/'))
});

gulp.task('default', ['css', 'font', 'js', 'img', 'doc', 'bs4']);
