const puppeteer = require("puppeteer");
const userInfo = require("../config/userInfo");

describe("Linkedin Connection Test", () => {
  it("Brower Launched", async () => {
    const browser = await puppeteer.launch({
      headless: true,
      // slowMo: 10,
      // devtools: true,
    });
    // you can uncomment slow mo, devtools and you can turn the headless to false to see how the test is running
    const page = await browser.newPage();
    // await page.waitForTimeout(3000); /// acts as delay function in puppeteer
    await page.goto("https://linkedin.com");
    await page.type("#session_key", userInfo.Email);
    await page.type("#session_password", userInfo.Password);
    await page.click(".sign-in-form__submit-button");
    await page.waitForSelector("#ember27");
    await page.click("#ember27");
    await page.evaluate(() => {
      setTimeout(() => {
        let list = document.querySelectorAll("button");
        list.forEach((element) => {
          if (element.getAttribute("aria-label") != null) {
            let reg = /Invite/;
            let elementAriaLabel = element
              .getAttribute("aria-label")
              .toString();
            let result = reg.exec(elementAriaLabel);
            console.log(result);
            if (result != null) {
              element.click();
            }
          }
        });
      }, 5000);
    });
  });
});
