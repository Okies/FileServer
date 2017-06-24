var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {

  //console.log(path.normalize('D:\\root'));
  //var rootPath = path.dirname('D:\root');
  //console.log('root : ', rootPath);
  process.chdir('D:\\root');
  console.log(process.cwd());

  var result = [];
  fs.readdir('.\\', function(err, list) {
    if(err) throw err;
    console.log('dir length : ' + list.length);
    result = list;
    list.forEach(function(file) {
      fs.stat(file, function(err, stat) {
        if(err) throw err;
        console.log('file : ' + file);
        console.log('isFile : ' + stat.isFile() + ', isDir : ' + stat.isDirectory());
      });
    });
  });

  console.log(result);

  res.render('index', { title: 'Express' });
});

module.exports = router;
