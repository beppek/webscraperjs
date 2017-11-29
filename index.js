let Crawler = require("./Crawler");
let WikiPage = require("./WikiPage");

let pages = new Set([
  new WikiPage("/wiki/Ethereum"),
  new WikiPage("/wiki/Floorball")
]);

let c = new Crawler(pages);
c.crawl();