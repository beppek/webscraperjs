let fileHandler = require("./fileHandler");
let rp = require("request-promise");
let WikiPage = require("./WikiPage");

const LINK_CAP = 15;
const BASE_URL = "https://en.wikipedia.org";

class Crawler {
  constructor(pages) {
    this.pages = pages;
    this.visited = new Set();
  }

  crawl() {
    let links = new Set();
    this.pages.forEach(page => {
      page.root = page.title;
      this.scrape(page)
        .then(() => {
          this.crawlLinks(page)
            .then((data) => {
              links.add(data);
              fileHandler.savePage(page);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  scrape(page) {
    return new Promise((resolve, reject) => {
      rp(BASE_URL + page.path)
      .then((htmlString) => {
        page.setContent(htmlString)
        this.extractInternalLinks(page);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }

  extractInternalLinks(page) {
    let p = /href=\"\/wiki\/(?!.*:)(.*?)\"/gi;
    let matches = page.html.match(p);
    let links = new Set();
    matches.forEach(match => {
      links.add(match.substring(6, match.length -1));
    });
    page.links = links;
  }

  crawlLinks(root) {
    let promises = [];
    let depth = 2;
    let links = root.links;
    let pageLinks = new Set(links);
    for (let i = 0; i < depth; i++) {
      pageLinks.forEach(link => {
        if (!this.visited.has(link)) {
          this.visited.add(link);
          let page = new WikiPage(link);
          page.root = root.title;
          promises.push(new Promise((resolve, reject) => {
            this.scrape(page)
            .then(() => {
              links.add(page.links);
              fileHandler.savePage(page);
              resolve();
            });
          }));
        }
      });
      pageLinks = new Set(links);
    }
    return Promise.all(promises).then(() => {
      return Promise.resolve(links);
    });
  }
}

module.exports = Crawler;