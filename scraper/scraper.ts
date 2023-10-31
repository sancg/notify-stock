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
    name: 'test available product',
    url: 'https://www.amazon.com/Geometry-Programmers-Oleksandr-Kaleniuk/dp/1633439607'
  }
];

void (async () => {
  /* -----------  Browser setup ----------- */
  const browser = await chromium.launch({
    // headless: true
    // slowMo: 30
  });

  // create new context
  const context = await browser.newContext();

  // add init script
  await context.addInitScript(
    "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
  );

  /* ----------------------------------- */

  const page = await context.newPage();

  for (const product of products) {
    if (typeof product.name === 'string' && /test/gi.test(product.name))
      continue;

    await page.goto(product.url, { waitUntil: 'domcontentloaded' });

    const getTitle = (await page.textContent('#title'))?.trim();
    const hasStock = !((await page.$('#buy-now-button')) == null);
    product.name = getTitle;
    product.hasStock = hasStock;
    console.log(product);
  }

  await context.close();
  await browser.close();
})();
