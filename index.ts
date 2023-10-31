import { chromium } from 'playwright';

interface Product {
  name?: string;
  url: string;
  hasStock?: boolean;
}

const products: Product[] = [
  {
    url: 'https://www.amazon.com/dp/B0C2XXMPLY/?coliid=I38OD59C8PRP8C&colid=2RMR8T6DALZ0&psc=0&ref_=list_c_wl_lv_ov_lig_dp_it_im'
  },
  {
    url: 'https://www.amazon.com/Geometry-Programmers-Oleksandr-Kaleniuk/dp/1633439607'
  }
];

void (async () => {
  // Setup
  const browser = await chromium.launch({
    headless: true
    // slowMo: 30
  });
  const page = await browser.newPage();

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false
    });
  });

  for (const product of products) {
    await page.goto(product.url);
    const getTitle = (await page.textContent('#title'))?.trim();
    const hasStock = !((await page.$('#buy-now-button')) == null);
    product.name = getTitle;
    product.hasStock = hasStock;
    console.log(product);
  }

  await browser.close();
})();
