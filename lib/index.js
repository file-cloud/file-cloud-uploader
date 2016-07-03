'use strict';

module.exports = function (type, filename, config, next) {
  var path;
  switch (type) {
    case 'ci':
    case 'cloudinary':
      path = './uploaders/cloudinary';
      break;
    case 'aws':
    case 's3':
      path = './uploaders/s3';
      break;
    case 'ali':
    case 'oss':
      path = './uploaders/oss';
      break;
    case 'disk':
      path = './uploaders/disk';
      break;
    default:
      return next(true);
  }
  require(path).uploader(filename, next, config);
};
