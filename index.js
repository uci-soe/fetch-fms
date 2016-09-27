/**
 * Created by rhett on 9/22/16.
 */
'use strict';

const connection = require('./lib/connection');

const promiseOrDone = require('./lib/promis-or-done');

let fetch = function (layouts, config, done) {
  const db = fetch.connection(config);

  let proms = Promise.all(layouts.map(l => fetch.__layout(l, db)));
  return promiseOrDone(proms, done);
};

fetch.__layout    = function (layout, db) {
  return new Promise((resolve, reject) => {
    db.layout(layout)
      .findall()
      .send((err, res) => {
        if (err) {
          reject(err);
        } else {
          res.layout = layout;
          resolve(res);
        }
      });
  })
};
fetch.layoutNames = function (config, done) {
  const db = fetch.connection(config);
  let prom = new Promise((resolve, reject) => {
    db.layoutnames()
      .send((err, results) => {
        if (err) {
          reject(err);
        } else {
          let names = results.data
                .map(l => l.LAYOUT_NAME)
                .filter(l => !/^-/.test(l))
                .filter(l => l)
            ;
          resolve(names);
        }
      })
    ;
  });
  return promiseOrDone(prom, done);
};
fetch.connection  = function (config) {
  return connection({
    url:      config.host,
    userName: config.username,
    password: config.password
  }).db(config.database);
};

module.exports = fetch;