'use strict';
var fcdu = require('file-cloud-disk-uploader');
var fcaws3u = require('file-cloud-aws-uploader');
var fcaliossu = require('file-cloud-alioss-uploader');

var diskUploader = function(filename, next, config) {

  fcdu(function(error, hashedFile) {
    next({error: error, path: config.dir + '/' + hashedFile, url: config.base + "/" + hashedFile});
  }, filename, config.dir);
};

var aws3Uploader = function(filename, next, config) {
  fcaws3u(function(error, hashedFile, data) {
    next({error: error, path: hashedFile, url: data.Location});
  }, filename, config);
};

var aliossUploader = function(filename, next, config) {
  fcaliossu(function(error, hashedFile, data) {
    next({error: error, path: hashedFile, url: data.Location});
  }, filename, config);
};


module.exports = function(type, filename, config, next) {
  switch(type) {
    case 's3':
      aws3Uploader(filename, next, config);
    case 'oss':
      aliossUploader(filename, next, config);
    case 'disk':
      diskUploader(filename, next, config);
  }
};
