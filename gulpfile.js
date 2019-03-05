const gulp = require('gulp');
const watch = require('gulp-watch');
const nunjucks = require('gulp-nunjucks-render');
require('dotenv').config();

var name = process.env.NAME || 'default';

gulp.task('html', () => {
    return watch([
        `./src/${name}/views/pages/*.html`,
        `./src/${name}/views/**/*.html`,
    ],
        function () {
            gulp.src('./src/' + name + '/views/pages/*.html')
                .pipe(nunjucks({
                    path: ['./src/' + name + '/views/'],
                    ext: '.html',
                    data: {
                        css: (data) => {
                            return './public/css/' + data
                        },
                        js: (data) => {
                            return './public/js/' + data
                        },
                        img: (data) => {
                            return './public/images/' + data
                        }
                    }
                }))
                .pipe(gulp.dest('dist/' + name + '/'));
        }
    );
})