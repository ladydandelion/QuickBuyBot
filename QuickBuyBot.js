const puppeteer = require('puppeteer');

const url ="walmart.com/ip/26in-Folding-Mountain-Bike-Shimanos-21-Speed-Bicycle-Full-Suspension-MTB-Bikes/618388688"

//Init URL in browser
async function initBrowser(){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

//Add to cart automatization process
async function addToCart(page){
    await page.$eval("button[class='button spin-button prod-ProductCTA—-primary button—primary']", elem => elem.click());
    await page.waitFor(2000);
    await page.evaluate(() => document.getElementsByClassName('bn bg-transparent br2 db flex flex-column items-center pa0 pointer relative sans-serif white')[0].click());
    await page.waitFor(2000);
    await page.evaluate(() => document.getElementsByClassName( 'button m-margin-top width-full button--primary') [0] .click());
    await page.waitFor(2000);
    await page.evaluate(() => document.getElementsByClassName( 'button cxo-continue-btn button—primary')[0].click());
 
}

//Delivery automatization process
async function delivery(page){
    await page.waitFor(2000);
    await page.type("input[id='firstName', 'Sara']");
    await page.waitFor(100);
    await page.type("input[id='lastName', 'Rodrigo']");
    await page.waitFor(100);
    await page.type("input[id='adressLineOne', '19 Selfridge St']");
    await page.waitFor(100);
    await page.type('#phone', '5654578933');
    await page.waitFor(100);
    await page.type('#email', 'random@gmail.com');
    await page.waitFor(200);
    const input = await page.$("input[name='city']");
    await input.click({clickCount: 3});
    await input.type('Colorado Springs');
    await page.waitFor(200);
    const input2 = await page.$("input[name='postalCode']");
    await input.click({clickCount: 3});
    await input.type('80829');
    await page.$eval("button[class='button button--primary']", elem => elem.click());
}

//Payment automatization process
async function payment(page){
   await page.waitFor(3000);
   await page.type('#creditCard','3012767675481331');
   await page.select('#month-chooser','02');
   await page.waitFor(100); 
   await page.select('#year-chooser','2024');
   await page.type('#cvv','234');
   await page.$eval("button[class='submit']", elem => elem.click());
}

//Submit Order automatization process
async function submit_order(page){
    await page.waitFor(2000);
    await page.$eval("button[aria-label='Place Order']", elem => elem.click());
 }

async function checkout(){
    const page=await initBrowser();
    await addToCart(page);
    await delivery(page);
    await payment(page);
    await submit_order(page);
}

checkout();