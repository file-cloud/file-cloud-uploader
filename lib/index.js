'use strict';
var fcdu = require('file-cloud-disk-uploader');
var fcaws3u = require('file-cloud-aws-uploader');
var fcaliossu = require('file-cloud-alioss-uploader');
var fccloudinaryu = require('file-cloud-cloudinary-uploader');

var diskUploader = function (filename, next, config) {
  fcdu(function (error, hashedFile) {
    if (error) {
      return next({});
    }
    next({
      error: error,
      path: config.dir + '/' + hashedFile,
      url: config.base + '/' + hashedFile
    });
  }, filename, config.dir);
};

var aws3Uploader = function (filename, next, config) {
  fcaws3u(function (error, hashedFile, data) {
    if (error) {
      return next({});
    }
    next({
      error: error,
      path: hashedFile,
      url: data.Location
    });
  }, filename, config);
};

var aliossUploader = function (filename, next, config) {
  fcaliossu(function (error, hashedFile, data) {
    if (error) {
      return next({});
    }
    next({
      error: error,
      path: hashedFile,
      url: data.Location
    });
  }, filename, config);
};

var cloudinaryUploader = function (filename, next, config) {
  fccloudinaryu(function (error, hashedFile, data) {
    if (error) {
      return next({});
    }
    /* eslint camelcase: ['error', {properties: 'never'}] */
    next({
      error: error,
      path: hashedFile,
      url: data.url,
      secure_url: data.secure_url
    });
  }, filename, config);
};

module.exports = function (type, filename, config, next) {
  switch (type) {
    case 'ci':
    case 'cloudinary':
      cloudinaryUploader(filename, next, config);
      break;
    case 'aws':
    case 's3':
      aws3Uploader(filename, next, config);
      break;
    case 'ali':
    case 'oss':
      aliossUploader(filename, next, config);
      break;
    case 'disk':
      diskUploader(filename, next, config);
      break;
    default:
      next(true);
  }
};
