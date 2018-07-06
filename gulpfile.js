const gulp = require('gulp')
    , sass = require('gulp-sass')
    , fs = require('fs')
    , ejs = require('gulp-ejs')
    , pug = require('gulp-pug')
    , minify = require('gulp-cssnano')
    , path = require('path')
    , plumber = require('gulp-plumber')
    , browserSync = require('browser-sync').create()
    , sourcemaps = require('gulp-sourcemaps')
    , _ = require('lodash');

const _arr = process.argv;
// const project = path.join(__dirname, process.argv[process.argv.length - 1 ]);
const loadDataProject = JSON.parse(fs.readFileSync(`./${_arr[_arr.length - 1 ]}/package.json`))
var project = {
    name: loadDataProject.name,
    eng: loadDataProject.eng
};
const _struct = [
    {
        in: 'css/*.*',
        to: 'dist/css/'
    },
    {
        in: 'js/*.js',
        to: 'dist/js/'
    },
    {
        in: 'fonts/*.*',
        to: 'dist/fonts/'
    },
    {
        in: 'images/*.*',
        to: 'dist/images/'
    },
    {
        in: `dev/${project.eng}/*.*`,
        to: 'dev/'
    },
    {
        in: `dev/${project.eng}/layout/*.*`,
        to: 'dev/layout/'
    },
    {
        in: `dev/${project.eng}/components/*.*`,
        to: 'dev/components/'
    },

];

gulp.task('copy', () => {
    for(let _str of _struct){
        _log(`${_str.in} -> ${project.name}/${_str.to}`)
        gulp.src(`_resource/${_str.in}`)
        .pipe(gulp.dest(`${project.name}/${_str.to}`));
    }
})

// #region Sass
gulp.task('sass', () => {
    gulp.src(`${project.name}/dist/css/main.scss`)
        .pipe(sourcemaps.init())
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit('end');
                }
            })
        )
        .pipe(sass())
        // .pipe(sourcemaps.write())
        // .pipe(minify())
        .pipe(gulp.dest(`${project.name}/dist/css`))
});

gulp.task('fw', () => {
    gulp.src(`./_resource/*.scss`)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit('end');
                }
            })
        )
        .pipe(sass())
        .pipe(minify())
        .pipe(gulp.dest('./_resource/css'))
});

gulp.task('watch-sass', () => {
    gulp.watch([`${project.name}/dist/css/*.scss`],
    function () {
        gulp.run('sass');
    });
})
// #endregion

// #region Ejs
gulp.task('ejs', () => {
    gulp.src(`${project.name}/dev/*.ejs`)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.toString());
                this.emit('end');
            }
        })
        )
        .pipe(ejs({}, {}, { ext: '.html' }))
        .pipe(gulp.dest(project.name))
        // .pipe(browserSync.stream())
})
// #endregion

// #region Pug
gulp.task('pug', () => {
    gulp.src(`${project.name}/dev/*.pug`)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit('end');
                }
            })
        )
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(project.name))
        // .pipe(browserSync.stream())
})
gulp.task('watch-template', () => {
    gulp.watch([
        `${project.name}/dev/**/*.${project.eng}`],
        function () {
            gulp.run(project.eng);
        });
})
// #endregion

// #region watchin 
gulp.task('reload', () => {
    gulp.watch([`${project.name}/dist/css/*.css`, `${project.name}/*.html`]).on('change', browserSync.reload);
})

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: project
        }
    });
    gulp.run('reload')
});


gulp.task('test', () => {
    let lenh = process.argv;
    _log(lenh)
    _log(_.indexOf(lenh, ['-n', '-v']));
})

function _log(msg){
    console.log(msg);
}
