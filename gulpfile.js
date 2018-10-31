var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    rename      = require('gulp-rename'),
    cssmin      = require('gulp-cssnano'),
    prefix      = require('gulp-autoprefixer'),
    //concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    notify      = require('gulp-notify'),
    sassLint    = require('gulp-sass-lint'),
    sourcemaps  = require('gulp-sourcemaps');
    //uglify      = require('gulp-uglify');
    // Temporary solution until gulp 4
    // https://github.com/gulpjs/gulp/issues/355
    //runSequence = require('run-sequence');

    var displayError = function(error) {
        // Initial building up of the error
        var errorString = '[' + error.plugin.error.bold + ']';
        errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end
      
        // If the error contains the filename or line number add it to the string
        if(error.fileName)
            errorString += ' in ' + error.fileName;
      
        if(error.lineNumber)
            errorString += ' on line ' + error.lineNumber.bold;
      
        // This will output an error like the following:
        // [gulp-sass] error message in file_name on line 1
        console.error(errorString);
      };
      
      var onError = function(err) {
        notify.onError({
          title:    "Gulp",
          subtitle: "Failure!",
          message:  "Error: <%= error.message %>",
          sound:    "Basso"
        })(err);
        this.emit('end');
      };
      
      var sassOptions = {
        outputStyle: 'expanded'
      };
      
      var prefixerOptions = {
        browsers: ['last 2 versions']
      };
      
      // BUILD SUBTASKS
      // ---------------
      
      gulp.task('styles', function() {
        return gulp.src('sass/app.scss')
          .pipe(plumber({errorHandler: onError}))
          .pipe(sourcemaps.init())
          .pipe(sass(sassOptions))
          .pipe(prefix(prefixerOptions))
          .pipe(rename('index.css'))
          .pipe(gulp.dest('src'))
          .pipe(cssmin())
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest('src'))
      });
      
      gulp.task('sass-lint', function() {
        gulp.src('scss/**/*.scss')
          .pipe(sassLint())
          .pipe(sassLint.format())
          .pipe(sassLint.failOnError());
      });
      
      gulp.task('watch', function() {
        gulp.watch('sass/**/*.scss', ['styles']);
      });
      
      