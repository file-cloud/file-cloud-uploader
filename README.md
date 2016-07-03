#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> 用于服务器端的文件哈希服务

使用的文件哈希包[file-hash](https://github.com/file-cloud/file-hash)

1. 可以用于本地文件的哈希考贝 (采用了[file-cloud-disk-uploader](https://github.com/file-cloud/file-cloud-disk-uploader)) 

2. 可以用于阿里云oss的文件考贝(采用了[file-cloud-alioss-uploader](https://github.com/file-cloud/file-cloud-alioss-uploader)) 

3. 可以用于aws的s3的文件考贝(采用了[file-cloud-aws-uploader](https://github.com/file-cloud/file-cloud-aws-uploader)) 




## Install

```sh
$ npm install --save file-cloud-uploader
```


## Usage

```js
var fileCloudUploader = require('file-cloud-uploader');
```


####移动上传文件到服务器的特定目录


```js
var filename = path.resolve(__dirname, 'assets/a.txt');     //源文件地址
var config = {
  dir: path.resolve(__dirname, 'hashed/'),                  //文件要保存的地址
  base: 'http://localhost'                                  //指定文件保存后的域名地址，加上文件名组成可访问的文件地址
};
fileCloudUploader('disk', filename, config, function (data) {
  //data.error
  //data.path
  //data.url
});
```

####移动上传文件到aliyun oss

```js
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
  //data.error
  //data.path
  //data.url
  //TODO:
});
```

####移动上传文件到aws s3

```js
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
```

####移动上传文件到cloudinary

```js
var config = {
  cloud_name: process.env.FCU_CLOUDINARY_NAME,
  api_key: process.env.FCU_CLOUDINARY_API_KEY,
  api_secret: process.env.FCU_CLOUDINARY_API_SECRET
};

var filename = path.resolve(__dirname, 'assets/a.jpg');

fileCloudUploader('cloudinary', filename, config, function (data) {
  assert.equal(true, !data.error);
  assert.equal(true, typeof data.path === 'string');
  assert.equal(true, validator.isURL(data.url));
  assert.equal(true, validator.isURL(data.secure_url));
  done();
});
```



## License

MIT © [calidion](blog.3gcnbeta.com)


[npm-image]: https://badge.fury.io/js/file-cloud-uploader.svg
[npm-url]: https://npmjs.org/package/file-cloud-uploader
[travis-image]: https://travis-ci.org/file-cloud/file-cloud-uploader.svg?branch=master
[travis-url]: https://travis-ci.org/file-cloud/file-cloud-uploader
[daviddm-image]: https://david-dm.org/file-cloud/file-cloud-uploader.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/file-cloud/file-cloud-uploader
