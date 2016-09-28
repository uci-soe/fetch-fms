/**
 * Created by rhett on 9/22/16.
 */
'use strict';

const csvStringify  = require('csv-stringify');
const fs            = require('fs');
const path          = require('path');
const Archiver      = require('archiver');
const mkdirp        = require('mkdirp');

module.exports = {
  toCSV:        (data, noHeaders) => {
    if (data.length === 0) {
      return Promise.resolve('');
    }

    if (!noHeaders) {
      //make object with header names as header content
      let headers = {};
      Object.getOwnPropertyNames(data[0])
        .forEach(h => headers[h] = h);

      // add to beginning of data set
      data.unshift(headers);
    }

    return new Promise((resolve, reject) => {
      // stringify data and resolve
      csvStringify(data, {}, function (err, content) {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  },
  toUglyJSON:   data => Promise.resolve(JSON.stringify(data)),
  toPrettyJSON: data => Promise.resolve(JSON.stringify(data, null, 2)),

  stdout: (content) => content.pipe ? content.pipe(process.stdout) : process.stdout.write(content),
  file:   (loc, content) => {
    return new Promise((resolve, reject) => {
      mkdirp(path.resolve(loc, '..'), err => {
        if (err) {
          return reject(err);
        }

        if (content.pipe) {
          content.pipe(fs.createWriteStream(loc));
        } else {
          fs.writeFile(loc, content, function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      })
    });
  },
  zip:    (files) => {
    if (!files.join) {
      files = [files];
    }
    let a = Archiver.create('zip', {});

    files.forEach(f => {
      a.append(f.content, {name: f.name});
    });
    a.finalize();

    return a;
  }
};
