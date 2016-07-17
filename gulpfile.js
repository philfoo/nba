var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var babelify = require("babelify");
var fs = require('fs');

var path = {
    HTML: 'client/index.html',
    MINIFIED_OUT: 'build.min.js',
    OUT: 'build.js',
    DEST: 'dist',
    DEST_BUILD: './dist/build',
    DEST_SRC: './dist/src',
    ENTRY_POINT: './client/components/main.js'
};

// gulp.task('copy', function(){
//     gulp.src(path.HTML)
//         .pipe(gulp.dest(path.DEST));
// });

// gulp.task('build', function(){
//     browserify("client/components/main.js")
//         .transform("babelify", {presets: ["es2015", "react"]})
//         .bundle()
//         .pipe(fs.createWriteStream("bundle.js"));
// });

// gulp.task('watch', function(){
//     gulp.watch(path.HTML, ['copy']);

//     var watcher = watchify(browserify({
//         entries: [path.ENTRY_POINT],
//         transform: [reactify],
//         debug: true,
//         cache: {}, packageCache: {}, fullPaths: true
//     }));

//     return watcher.on('update', function(){
//         watcher.bundle()
//             .pipe(source(path.OUT))
//             .pipe(gulp.dest(path.DEST_SRC))
//             console.log('Updated');
//     })
//         .bundle()
//         .pipe(source(path.OUT))
//         .pipe(gulp.dest(path.DEST_SRC));
// });

gulp.task('watch', function(){
    browserify("client/main.js")
        .transform(babelify.configure({
            presets: ["es2015", "react"],
            ignore: 'node_modules/',
            compact: false
        }))
        .bundle()
        .pipe(fs.createWriteStream("bundle.js"));
});

gulp.task('default', ['watch']);





