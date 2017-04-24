// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json

// Variables de chemins
var source = './sass'; // dossier de travail
var destination = './css'; // dossier à livrer

// Tâche "build" = SASS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('sasscompil', function () {
  return gulp.src(source + '*.scss')
    .pipe(plugins.sass().on('error', sass.logError))
//    .pipe(sass().on('error', sass.logError))
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + ''));
});

// Tâche "minify" = minification CSS (destination -> destination)
gulp.task('minify', function () {
  return gulp.src(destination + '/assets/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destination + '/assets/css/'));
});

// Tâche "build"
gulp.task('build', ['sasscompil']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build',  'minify']);

// Tâche "watch" = je surveille *less
gulp.task('watch', function () {
  gulp.watch(source + '/assets/css/*.less', ['build']);
});

// Tâche par défaut
gulp.task('default', ['build']);