const gulp         = require('gulp')
const jade         = require('gulp-jade')
const sass         = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const imagemin     = require('gulp-imagemin')
const cache        = require('gulp-cache')
const browserify   = require('browserify')
const source       = require('vinyl-source-stream')
const browserSync  = require('browser-sync').create()
const ngrok        = require('ngrok')
const runSequence  = require('run-sequence')
const del          = require('del')
const config = {
          port:   8080,
          root:   '.',
          start:  'dev',
          finish: 'docs'
      }
const start  = config.root + '/' + config.start
const finish = config.root + '/' + config.finish

gulp.task('pages', function() {
  return gulp.src(start+'/pages/index.jade')
             .pipe(jade())
             .pipe(gulp.dest(finish))
             .pipe(browserSync.reload({stream: true}))
})

gulp.task('styles', function() {
  return gulp.src(start+'/styles/main.+(scss|sass)')
             .pipe(sass()).on('error', sass.logError)
             .pipe(autoprefixer())
             .pipe(gulp.dest(finish+'/styles'))
             .pipe(browserSync.stream())
})

gulp.task('scripts', function() {
  return browserify({
    entries: [ start + '/scripts/main.js' ]
  }).bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(finish+'/scripts'))
})

gulp.task('images', function(){
    return gulp.src(start+'/images/**/*.+(png|jpg|gif|svg)')
               .pipe(cache(imagemin()))
               .pipe(gulp.dest(finish+'/images'))
})

gulp.task('clean', function() {
  return del(finish+'/**/*', {force: true})
})

gulp.task('build', ['clean'], function() {
  runSequence(['images', 'styles', 'scripts', 'pages'])
})

gulp.task('watch', ['build'], function() {
  gulp.watch(start+'/pages/**/*.jade', ['pages', 'images'])
  gulp.watch(start+'/styles/**/*.scss', ['styles'])
  gulp.watch(start+'/scripts/**/*.js', ['scripts'])
})

gulp.task('serve', function() {
  browserSync.init({
    port: config.port,
    notify: false,
    server: {
      baseDir: finish
    }
  })
})

gulp.task('tunnel', function() {
  ngrok.connect(config.port, function (err, url) {
      console.log("Tunnel created at "+url+".");
  });
})

gulp.task('develop', function() {
  runSequence('watch', 'serve')
})

gulp.task('default', function() {
  runSequence('develop', 'tunnel')
})
