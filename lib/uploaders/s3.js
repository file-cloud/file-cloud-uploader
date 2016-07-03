var fcaws3u = require('file-cloud-aws-uploader');

var uploader = {
  uploader: function (filename, next, config) {
    fcaws3u(uploader.callback(next), filename, config);
  },
  callback: function (next) {
    return function (error, hashedFile, data) {
      if (error) {
        return next({error: true});
      }
      next({
        error: error,
        path: hashedFile,
        url: data.Location
      });
    };
  }
};

module.exports = uploader;
