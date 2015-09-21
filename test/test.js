'use strict';
var assert = require('assert');
var fileCloudUploader = require('../');
var path = require('path');
var fs = require('fs');
var validator = require('validator');

describe('file-cloud-uploader node module', function () {
  it('should be able to make a disk uploading', function (done) {
    var filename = path.resolve(__dirname, 'assets/a.txt');
    var config = {
      dir: path.resolve(__dirname, 'hashed/'),
      base: 'http://localhost'
    };
    fileCloudUploader('disk', filename, config, function (data) {
      assert.equal(true, !data.error);
      assert.equal(true, fs.existsSync(data.path));
      assert.equal(true, validator.isURL(data.url));
      done();
    });
  });

  it('should be able to make an alioss uploading', function (done) {
    var config = {
      accessKeyId: process.env.ALIYUN_OSS_ACCESS_KEY_ID,
      secretAccessKey: process.env.ALIYUN_OSS_ACCESS_KEY_SECRET,
      endpoint: process.env.ALIYUN_OSS_ENDPOINT,
      apiVersion: process.env.ALIYUN_OSS_APP_VERSION,
      Bucket: process.env.ALIYUN_OSS_BUCKET,
      base: process.env.ALIYUN_OSS_BASE
    };
    var filename = path.resolve(__dirname, 'assets/a.jpg');


    fileCloudUploader('oss', filename, config, function (data) {
      assert.equal(true, !data.error);
      done();
    });
  });

  it('should be able to make an aws s3 uploading', function (done) {
    var called = false;
    var config = {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
      endpoint: process.env.AWS_S3_ENDPOINT,
      Bucket: process.env.AWS_S3_BUCKET,
      region: process.env.AWS_S3_REGION,
      progress: function (/*evt*/) {
        called = true;
      }
    };

    var filename = path.resolve(__dirname, 'assets/a.jpg');

    fileCloudUploader('s3', filename, config, function (data) {
      assert.equal(true, !data.error);
      assert.equal(true, typeof data.path === 'string');
      assert.equal(true, validator.isURL(data.url));
      done();
    });
  });
});
