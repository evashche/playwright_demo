import BaseWeb from "../baseWeb.js";

class Header extends BaseWeb {
  constructor(page) {
    super(page);
    this.loc = "//header";
    this.store = "store/cpanel-licenses";
  }
}

export class MainPage {
  constructor(page) {
    this.header = new Header(page);
  }
}
