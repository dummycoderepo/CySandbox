const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  try {
    const context = await browser.newContext();

    await context.addInitScript({
      content: `window.sessionStorage.setItem('session-username', 'standard_user');`
    });

    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/v1/inventory.html');

    console.log(await page.title()); // Should print "Swag Labs"

    //save the local and session storage to a file
    const localStorageData = await page.evaluate(() => JSON.stringify(window.localStorage));
    const sessionStorageData = await page.evaluate(() => JSON.stringify(window.sessionStorage));
    const fs = require('fs');
    fs.writeFileSync('localStorage.json', localStorageData);
    fs.writeFileSync('sessionStorage.json', sessionStorageData);
    
  } finally {
    await browser.close();
  }
})();
