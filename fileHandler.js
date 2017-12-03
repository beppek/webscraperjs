let fs = require("fs");

module.exports = {
  savePage: savePage,
  createDirs: createDirs
}

function savePage(page) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${page.rootDir}/${page.title}.txt`, page.html, (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}

function createDirs(page) {
  return new Promise((resolve, reject) => {
    let dataDir = './data';
    let rootDir = `${dataDir}/${page.root}`;
    fs.mkdir(dataDir, (err) => {
      if (err && err.code !== 'EEXIST') { reject(err) }
      fs.mkdir(rootDir, (err) => {
        if (err && err.code !== 'EEXIST') { reject(err) }
        resolve(rootDir);
      });
    });
  });
}