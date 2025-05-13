import BaseWeb, { formatPrice, whiteSpace } from "../baseWeb.js";

class Stepper extends BaseWeb {
  constructor(page) {
    super(page);
    this.page = page;
    this.loc = "//div[@id='order-standard_cart']";
  }

  itemsByPos = (pos) => new ReviewItems(this.page, this.loc, pos);
  itemsByPosTable = (pos) => new TableItems(this.page, this.loc, pos);
}

class TableItems extends BaseWeb {
  constructor(page, loc, pos) {
    super(page);
    this.loc = `${loc}//table//tbody//tr[${pos}]`;
  }

  column = (pos) => new Column(this.page, this.loc, pos);
}

class Column extends BaseWeb {
  constructor(page, loc, pos) {
    super(page);
    this.loc = `${loc}/td[${pos}]`;
  }
}

class ReviewItems extends BaseWeb {
  constructor(page, loc, pos) {
    super(page);
    this.loc = `${loc}//div[@class='item'][${pos}]`;
  }

  title = () => new ReviewTitle(this.page, this.loc);
  priceCycle = (pos = 2) => new ReviewPrice(this.page, this.loc, pos);
  priceRated = (pos = 1) => new ReviewPrice(this.page, this.loc, pos);
}

class ReviewTitle extends BaseWeb {
  constructor(page, loc) {
    super(page);
    this.loc = `${loc}//span[@class='item-title']`;
  }
}

class ReviewPrice extends BaseWeb {
  constructor(page, loc, pos) {
    super(page);
    this.loc = `${loc}//div[2]/span[${pos}]`;
  }
}

class OrderSummary extends BaseWeb {
  constructor(page) {
    super(page);
    this.page = page;
    this.loc = "//div[@id='orderSummary']";
  }

  total = () => new Total(this.page, this.loc);
  submit = () => new SubmitButton(this.page, this.loc);
  checkout = () => new CheckOutButton(this.page, this.loc);
}

class SubmitButton extends BaseWeb {
  constructor(page, loc) {
    super(page);
    this.loc = `${loc}//button`;
  }
}

class CheckOutButton extends BaseWeb {
  constructor(page, loc) {
    super(page);
    this.loc = `${loc}//a[@id='checkout']`;
  }
}

class Total extends BaseWeb {
  constructor(page, loc) {
    super(page);
    this.loc = `${loc}${this.text.EQUAL_TEXT("Total Due Today")}/../span[1]`;
  }
}

class Addons extends BaseWeb {
  constructor(page) {
    super(page);
    this.loc = `//div[@id='productAddonsContainer']//div[2]/div/div`;
  }

  title = () => new AddonsTitle(this.page, this.loc);
  price = () => new AddonsPrice(this.page, this.loc);
}

class AddonsTitle extends BaseWeb {
  constructor(page, loc) {
    super(page);
    this.loc = `${loc}//label`;
  }
}

class AddonsPrice extends BaseWeb {
  constructor(page, loc) {
    super(page);
    this.loc = `${loc}/div[2]`;
  }
}

export class CartPage {
  constructor(page) {
    this.stepper = new Stepper(page);
    this.addons = new Addons(page);
    this.order = new OrderSummary(page);
  }
}
