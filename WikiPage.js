class WikiPage {
  constructor(path) {
    this.path = path;
    this.setTitle(path.split("/")[2]);
  }

  setTitle(rawTitle) {
    this.title = rawTitle.replace("[^a-zA-Z0-9.\\-]", "-").toLowerCase();
  }

  setContent(rawHTML) {
    this.html = rawHTML;
  }

  setRootDir(dir) {
    this.rootDir = dir;
  }
}

module.exports = WikiPage;