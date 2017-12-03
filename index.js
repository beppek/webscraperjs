let prompt = require('./prompt-promise');
let Crawler = require("./Crawler");
let WikiPage = require("./WikiPage");

let regexp = /\/wiki\/(?!.*:)(.*?)/;

let props = [
  {
    name: 'FirstPage',
    validator: regexp,
    warning: 'The link should begin with /wiki/ and everything that follows. Anything before that is not needed.'
  },
  {
    name: 'SecondPage',
    validator: regexp,
    warning: 'The link should begin with /wiki/ and everything that follows. Anything before that is not needed.'
  }
]

let pages = new Set();

prompt.start();
console.log('Please provide 2 pages from Wikipedia that should be the root for the crawler. Input should begin with /wiki/ and everything that follows. Anything before that is not needed');

prompt.get(props)
  .then((res) => {
    console.log('You have selected the following pages:');
    console.log(res.FirstPage);
    console.log(res.SecondPage);
    for (const page in res) {
      if (res.hasOwnProperty(page)) {
        pages.add(new WikiPage(res[page]));
      }
    }
    let c = new Crawler(pages);
    c.crawl();
});
