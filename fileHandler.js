let fs = require("fs");

module.exports = {
  savePage: savePage
}

function savePage(page) {
  return new Promise((resolve, reject) => {
    createDirs(page.root)
      .then((dir) => {
        fs.writeFile(`${dir}/${page.title}.txt`, page.content, (err) => {
          if (err) { reject(err); }
          resolve();
      });
    });
  });
}

function createDirs(root) {
  return new Promise((resolve, reject) => {
    let dataDir = './data';
    let rootDir = `${dataDir}/${root}`;
    fs.mkdir(dataDir, (err) => {
      if (err && err.code !== 'EEXIST') { reject(err) }
      fs.mkdir(rootDir, (err) => {
        if (err && err.code !== 'EEXIST') { reject(err) }
        resolve(rootDir);
      });
    });
  });
}