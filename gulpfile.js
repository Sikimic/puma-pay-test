var path = require('path');
var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');
var fs = require("fs");
const modulePath = './modules';


var jsdocOptions = {'opts': {'destination': './api-docs'}, 'plugins': ['jsdoc-http-plugin']};

gulp.task('jsdoc', (cb) => {
  var folders = fs.readdirSync(modulePath);
  folders = folders.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));//remove hidden files
  folders = folders.filter(item => !(/\w+\.js/g).test(item));

  for(var index in folders) {
    var fileName = folders[index];
    folders[index] = path.join(modulePath, folders[index]);
    folders[index] = folders[index] + '/' + fileName;
    folders[index] += '.js';
  }

  gulp.src(folders)
  .pipe(jsdoc(jsdocOptions, cb));
  
});

gulp.task('default', ['jsdoc']);
