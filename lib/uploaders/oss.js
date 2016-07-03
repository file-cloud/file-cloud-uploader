var fcaliossu = require('file-cloud-alioss-uploader');
var uploader = {
  uploader: function (filename, next, config) {
    fcaliossu(uploader.callback(next), filename, config);
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

