import BaseWeb, { formatPrice, whiteSpace } from "../baseWeb.js";

class Products extends BaseWeb {
  constructor(page) {
    super(page);
    this.page = page;
    this.loc = "//div[@id='products']";
  }

  store = "store/cpanel-licenses";
  title = () => new Title(this.page, this.loc);
  price = () => new Price(this.page, this.loc);
  buy = () => new BuyNow(this.page, this.loc);
}

class Title extends BaseWeb {
  constructor(page, loc) {
    super(page);
    this.page = page;
    this.loc = `${loc}//header`;
  }

  async formatFirst() {
    return whiteSpace(await this.getTextFirst());
  }
}

class Price extends BaseWeb {
  constructor(page, loc) {
    super(page);
    this.page = page;
    this.loc = `${loc}//footer//span`;
  }

  async formatFirst() {
    return formatPrice(await this.getTextFirst());
  }
}

class BuyNow extends BaseWeb {
  constructor(page, loc) {
    super(page);
    this.page = page;
    this.loc = `${loc}//a`;
  }
}

export class StorePage {
  constructor(page) {
    this.products = new Products(page);
  }
}
