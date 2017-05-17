var gulp = require('gulp');
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
//编译sass，使其缩小化
gulp.task('styles', function() {  
  return gulp.src('src/css/main.scss')
  // return sass('src/styles/main.scss', {
  // 			style: 'expanded',
  // })
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    //输出的文件路径吗？
    .pipe(gulp.dest('dist/assets/css'))
    //添加文件后缀
    .pipe(rename({suffix: '.min'}))
    //最小化css
    .pipe(minifycss())
    //输出最小化后的版本
    .pipe(gulp.dest('dist/assets/css'))
    //发送通知信息
    .pipe(notify({ message: 'Styles task complete' }));
});

//拼接、缩小化js
gulp.task('scripts', function() {  
  return gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

//图片压缩
gulp.task('images', function(){
	return gulp.src('src/images/**/*')
	    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    	.pipe(gulp.dest('dist/assets/img'))
    	.pipe(notify({ message: 'Images task complete' }));
})

gulp.task('clean', function() {  
  return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'scripts', 'images');
});


gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);

  var server = livereload();
  gulp.watch(['dist/**']).on('change', function(file) {
    server.changed(file.path);
  });
});



// gulp.task('default', function(){
// 	gulp.run('watch');
// })

// gulp.task('watch', function(){
// 	var watcher = gulp.watch('js/*.js', ['printChange']);
// 	watcher.on('change', function(event){
// 		console.log('File is' + event.path + 'was' + event.type + ', running tasks...');
// 	})
// })

// gulp.task('printChange', function(){
// 	console.log('变动完成');
// })



