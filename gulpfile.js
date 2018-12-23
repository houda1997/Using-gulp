var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var buildSass = require('gulp-sass');
var buildJS = require('gulp-terser');
var compressIMG = require('gulp-imagemin');
var minify = require('html-minifier');
var deploy = require('gulp-surge');

gulp.task('compileStyles',function(){
return gulp.src("css/*.css").pipe(buildSass()).pipe(gulp.dest('compilecss'))

});
gulp.task('minifySyles',function() {
    return gulp.src("compilecss/*.css").pipe(cleanCSS()).pipe(gulp.dest('build/css')) 
});

gulp.task('prepareStyle',gulp.series('compileStyles','minifyStyles'));

gulp.task('prepareScripts',function(){
    return gulp.src("js/*.js").pipe(buildJS()).pipe(gulp.dest('build/js'))
    
    });

gulp.task('prepareImages',function(){
    return gulp.src("images").pipe(compressIMG()).pipe(gulp.dest('build/image'))
        
    });

gulp.task('preparePages',function(){
    return gulp.src("index.html").pipe(minify()).pipe(gulp.dest('build'))
            
    });
gulp.parallel('prepareSite',gulp.parallel('prapareScripts' , 'prepareImages' , 'preparePages'));


gulp.task('deploy', [], function () {
    return deploy({
      project: './build',         
      domain: 'HoudaAbouchamala.surge.sh'  
    });
  });

  var slack = require('gulp-slack')({
      url: 'https://hooks.slack.com/services/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',

  });
   
gulp.task('notify', function () {
      return slack('Deployed latest build');
  });

gulp.task('default',gulp.series('prepareSite','deploy','notify'));
