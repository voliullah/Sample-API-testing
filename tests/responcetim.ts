import { chromium ,Response,request} from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const response = await page.goto('https://example.com');
  const request = response.request();
  const timing = request.timing();
  const responseTime = timing.responseEnd - timing.requestStart;

  if (responseTime < 500) {
    console.log(`Response time is ${responseTime} ms, which is less than 500 ms`);
  } else {
    console.log(`Response time is ${responseTime} ms, which is more than 500 ms`);
  }

  await browser.close();
})();