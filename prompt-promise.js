let prompt = require('prompt');

module.exports = {
  start: start,
  get: get
}

function start() {
  return prompt.start();
}

function get(p) {
  return new Promise((resolve, reject) => {
    prompt.get(p, (err, res) => {
      if (err) { reject(err); }
      resolve(res);
    });
  });
}