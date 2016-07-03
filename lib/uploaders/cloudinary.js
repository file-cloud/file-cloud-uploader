var fccloudinaryu = require('file-cloud-cloudinary-uploader');

var uploader = {
  uploader: function (filename, next, config) {
    fccloudinaryu(uploader.callback(next), filename, config);
  },
  callback: function (next) {
    return function (error, hashedFile, data) {
      if (error) {
        return next({error: true});
      }
      /* eslint camelcase: ['error', {properties: 'never'}] */
      next({
        error: error,
        path: hashedFile,
        url: data.url,
        secure_url: data.secure_url
      });
    };
  }
};

module.exports = uploader;
