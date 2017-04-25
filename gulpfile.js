// Requis
var gulp = require('gulp');

// Include plugins
// tous les plugins de package.json
var plugins = require('gulp-load-plugins')();


// Variables de chemins des fichiers à compiler
//var source = './sass/**/*.scss'; // dossier de travail
var source = './sass/**/application.scss'; // dossier de travail
var destination = './css/'; // dossier à livrer

//Variable pour les gems (à adapter selon environnement)
// File paths to various assets are defined here.
var PATHS = {
  gems: [
    '/home/webmaster/vendor/bundle/gems/susy-2.2.2/sass',
    '/home/webmaster/vendor/bundle/gems/breakpoint-2.7.1/stylesheets',
    '/home/webmaster/vendor/bundle/gems/',
  ],
  javascript: [
    '',
       
  ],
};
// Tâche "build" = SASS + autoprefixer + CSScomb + beautify (source -> destination)
gulp.task('sasscompil', function () {
  return gulp.src(source)

    .pipe(plugins.sass({
        bundleExec: true,
        outputStyle: 'compressed',
        includePaths: PATHS.gems,
        
    })
            .on('error', plugins.sass.logError)
            )

//    .pipe(plugins.csscomb())
//    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest(destination + ''));
});

// Tâche "minify" = minification CSS (destination -> destination)
//gulp.task('minify', function () {
//  return gulp.src(destination + '/assets/css/*.css')
//    .pipe(plugins.csso())
//    .pipe(plugins.rename({
//      suffix: '.min'
//    }))
//    .pipe(gulp.dest(destination + '/assets/css/'));
//});
//
//// Tâche "build"
//gulp.task('build', ['sasscompil']);
//
//// Tâche "prod" = Build + minify
//gulp.task('prod', ['build',  'minify']);
//
//// Tâche "watch" = je surveille *less
//gulp.task('watch', function () {
//  gulp.watch(source + '/assets/css/*.less', ['build']);
//});
//
//// Tâche par défaut
//gulp.task('default', ['build']);
gulp.task('default', ['sasscompil']);

//Debug des plugins chargés
 console.log(Object.keys(plugins)); 