const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');
const postcss = require('gulp-postcss');

const compile = (watch) => {
  var bundler = watchify(browserify('app/scripts/index.js', { debug: true }).transform(babel.configure({
      presets: ['es2015']
  })));

  const rebundle = () => {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }
  rebundle();
}

const watch = () => compile(true);

gulp.task('build', () => compile());
gulp.task('watch', () => watch());

gulp.task('css', () =>
    gulp.src('app/styles/*.css')
    .pipe(postcss([
        require('postcss-import')(),
        require("postcss-cssnext")()
     ]))
    .pipe(gulp.dest('dist'))
);

gulp.task('default', ['watch']);
