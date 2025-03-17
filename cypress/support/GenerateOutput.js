const { chromium } = require('playwright');

(async () => {
  // Get the argument from the command line
  const arg1 = process.argv[2];

  if (!arg1) {
    console.error('Please provide an argument.');
    process.exit(1);
  }

  // Launch browser
  const browser = await chromium.launch({
    headless: false // Set to true if you want to run in headless mode
  });

  // Create a new page
  const page = await browser.newPage();

  try {
    // Navigate to saucedemo.com
    await page.goto('https://www.saucedemo.com/v1/');
    
    // Log in using standard_user credentials
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    //Fail deliberately to test error handling
    //await page.click('#non-existent-button', { timeout: 1000 }); // Uncomment to test error handling

    // Wait for the products page to load
    await page.waitForSelector('.inventory_list');

    // Get all product names
    const products = await page.$$eval('.inventory_item_name', items => {
      return items.map(item => item.textContent);
    });

    // Print the list of products
    console.log('Available Products:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product}`);
    });

    // Print the argument
    console.log('Argument provided:', arg1);

  } catch (error) {
    console.log('Upload failed with an error => ', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();