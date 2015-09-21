'use strict';
var assert = require('assert');
var fileCloudUploader = require('../');
var path = require('path');
var fs = require('fs');
var validator = require('validator');

describe('file-cloud-uploader node module', function () {
  it('should be able to make a disk uploading', function (done) {
    var filename = path.resolve(__dirname, 'asserts/a.txt');
    var config = {
      dir: path.resolve(__dirname, 'hashed/'),
      base: 'http://localhost'
    };
    fileCloudUploader('disk', filename, config, function (data) {
      console.log(data);
      assert.equal(true, !data.error);
      assert.equal(true, fs.existsSync(data.path));
      assert.equal(true, validator.isURL(data.url));
      done();
    });
  });
});
