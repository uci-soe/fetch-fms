/**
 * Created by rhett on 9/27/16.
 */
'use strict';


const promiseOrDone = module.exports = (promise, done) => {
  if (done) {
    promise
      .catch(err => done(err))
      .then(res => done(null, res))
    ;
  } else {
    return promise;
  }
};
