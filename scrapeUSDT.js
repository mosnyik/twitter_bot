const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://spend.2settle.io/");

  await page.waitForSelector("h2");

  const content = await page.$eval("h2", (element) => element.textContent);

  console.log("The content is:", content);

  await browser.close();
})();

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto("https://www.bybit.com/en/fiat/trade/otc/sell/USDT/NGN", {
//     waitUntil: "networkidle2",
//   });

//   await page.waitForSelector(".trade-item-price-em");

//   const rate = await page.$eval(
//     ".trade-item-price-em",
//     (element) => element.innerText
//   );

//   console.log("The rate is:", rate);

//   await browser.close();
// })();
