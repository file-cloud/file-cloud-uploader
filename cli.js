#!/usr/bin/env node
'use strict';
var meow = require('meow');
var fileCloudUploader = require('./');

var cli = meow({
  help: [
    'Usage',
    '  file-cloud-uploader <input>',
    '',
    'Example',
    '  file-cloud-uploader Unicorn'
  ].join('\n')
});

fileCloudUploader(cli.input[0]);
