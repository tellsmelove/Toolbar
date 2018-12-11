const gulp = require('gulp');
const fs = require('fs');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const mqpacker = require('css-mqpacker');
const nunjucks = require('gulp-nunjucks-render');
const gulpEdge = require('gulp-edgejs');

require('dotenv').config();

const ext = process.env.EXT_ENGINE || "html"
const public_path = process.env.PUBLIC_PATH || "public";
const sass_path = process.env.SASS_PATH || "sass";
const dev_path = process.env.DEV_PATH || "dev";
const engine = process.env.ENGINE || "nunjucks"
const build_path = process.env.BUILD_PATH || "build";

const isPlugin = [
  mqpacker({
    sort: true
  }),
  autoprefixer({
    browsers: [
      'last 3 versions',
      'iOS >= 8',
      'Safari >= 8',
      'ie 11',
    ]
  })
]


gulp.task('scss', () => {
  console.log(public_path);
  
  gulp.src(`./${sass_path}/*.scss`)
    .pipe(
      plumber({
        errorHandler: function (error) {
          console.log(error.toString());
          this.emit('end');
        }
      })
    )
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(`./${build_path}/${public_path}/contents/css`))
    .pipe(
      postcss(isPlugin)
    )
    .pipe(gulp.dest(`./${build_path}/${public_path}/contents/css`))
})

gulp.task('watch-scss', () => {
  gulp.watch([`./${sass_path}/*.scss`, `./${sass_path}/**/*.scss`],
    function () {
      gulp.run('scss');
    });
})
gulp.task('engine', () => {
  if (engine === 'nunjucks') {
    gulp.src(`./${dev_path}/*.${ext}`)
      .pipe(nunjucks({
        path: [`./${dev_path}/`],
        ext: '.html',
        data: {
          style: `./${public_path}/contents/css`,
          script: `./${public_path}/contents/js`,
          img_path: `./${public_path}/contents/images`
        }
      }))
      .pipe(
        plumber({
          errorHandler: function (error) {
            console.log(error.toString());
            this.emit('end');
          }
        })
      )
      .pipe(gulp.dest(`./${build_path}`));
  }
  if (engine === 'edge') {
    gulp.src(`./${dev_path}/*.${ext}`)
      .pipe(gulpEdge({}, {
        ext: ".html"
      })).pipe(
        plumber({
          errorHandler: function (error) {
            console.log(error.toString());
            this.emit('end');
          }
        })
      )
      .pipe(gulp.dest(`./${build_path}`));
  }
})

gulp.task('watch-template', () => {
  gulp.watch([
    `./${dev_path}/*.${ext}`,
    `./${dev_path}/**/*.${ext}`
  ],
    function () {
      gulp.run('engine');
    }
  );
})

gulp.task('reload', () => {
  gulp.watch([
    `./${public_path}/contents/css/*.css`,
    `./${build_path}/*.html`
  ]).on('change', browserSync.reload);
})

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: `./${build_path}`
    }
  });
  gulp.run('reload')
});