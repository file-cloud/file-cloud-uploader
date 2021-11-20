var fcdu = require('file-cloud-disk-uploader');

var uploader = {
  uploader: function (filename, next, config) {
    var cb = uploader.callback(next, config);
    fcdu(cb, filename, config.dir);
  },
  callback: function (next, config) {
    return function (error, hashedFile) {
      if (error) {
        return next({error: true});
      }
      next({
        error: error,
        path: config.dir + '/' + hashedFile,
        url: config.base + '/' + hashedFile
      });
    };
  }
};

module.exports = uploader;
