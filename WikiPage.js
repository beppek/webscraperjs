class WikiPage {
  constructor(path) {
    this.path = path;
    this.setTitle(path.substring(6, path.length))
  }

  setTitle(rawTitle) {
    this.title = rawTitle.replace("[^a-zA-Z0-9.\\-]", "_");
  }

  setContent(rawHTML) {
    this.html = rawHTML;
  }
}

module.exports = WikiPage;