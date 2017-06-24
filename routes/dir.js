var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/*', function(req, res, next) {

  //console.log(path.normalize('D:\\root'));
  //var rootPath = path.dirname('D:\root');
  //console.log('root : ', rootPath);
  var req_url = decodeURI(req.url);
  var rootName = 'D:\\torrent';
  var realpath = '';
  if(req_url == '/') {
    realpath = rootName;
  } else {
    realpath = path.join(rootName, req_url.replace(/\//g, '\\'));
  }
  console.log("url :" + req_url);
  console.log("real:" + realpath);
  process.chdir(realpath);
  console.log(process.cwd());

  fs.readdir('.\\', function(err, list) {
    if(err) throw err;
    console.log('dir length : ' + list.length);
    list.forEach(function(file) {
      fs.stat(file, function(err, stat) {
        if(err) throw err;
        console.log('file : ' + file);
        console.log('isFile : ' + stat.isFile() + ', isDir : ' + stat.isDirectory());
      });
    });
    console.log('list : ', list);
    res.render('list', { lists: list });
  });
});

module.exports = router;
