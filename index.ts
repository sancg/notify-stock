import { chromium } from 'playwright';

interface Product {
  name: string;
  url: string;
}
const items: Product[] = [
  {
    name: 'Pyra and Mythra',
    url: 'https://www.amazon.com/dp/B0C2XXMPLY/?coliid=I38OD59C8PRP8C&colid=2RMR8T6DALZ0&psc=0&ref_=list_c_wl_lv_ov_lig_dp_it_im'
  },
  {
    name: 'test',
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

  await page.goto(items[0].url);

  const isAvailable = !((await page.$('#buy-now-button')) == null);
  console.log(isAvailable);

  await page.screenshot({ path: './test.png' });
  await browser.close();
})();
