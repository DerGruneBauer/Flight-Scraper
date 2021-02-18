const dotenv = require('dotenv');
dotenv.config();
// console.log(process.env.PHONE);
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const url = 'https://www.expedia.com/';
let userOrigin;
let userDestination;
let userDMonth = 'July';
let userDDate = 25;
//ask user how long trip will be in days. easier to do in backend
let tripDuration = 10;

// puppeteer
// .launch()
// .then(browser => browser.newPage())
// .then(page => {
//     return page.goto(url).then(function() {
//         return page.content();
//     });
// })
// .then(html => {
//     const $ = cheerio.load(html);
//     console.log(html);
//     const story = $('a[href*="/r/news/comments/"] h3');
//     const storyTitles = [];

//     for (let i=0; i < story.length; i++){
//         storyTitles.push({
//             title: $(story[i]).text(),
//         })
//     }
//     console.log(storyTitles);
// })




const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
var webdriver = require('selenium-webdriver');
const {Builder, By, Key} = require('selenium-webdriver');


(async function getPrice() {
  let driver = new webdriver.Builder().withCapabilities({ browserName: 'chrome', chromeOptions: { w3c: false } })
  .forBrowser('chrome')
  .build();

  //set origin
try{
   await driver.get('https://www.expedia.com/');
   let flightButton = driver.findElement(By.css('li:nth-child(2)'));
    await flightButton.click();
    await driver.sleep(2000);
    let fauxButtonO = driver.findElement(By.css('button.uitk-faux-input'));
    await fauxButtonO.click();
     let originInput = driver.findElement(By.css('input.uitk-field-input.uitk-typeahead-input'));
    await originInput.click();
    originInput.sendKeys("Detroit" + Key.ENTER); 

} catch(error) {
    console.log(error);
}

    //set destination
try{
     await driver.sleep(2000);
     let nearButton = driver.findElement(By.css('div.uitk-layout-grid-item.uitk-layout-grid-item-columnspan-small-1.uitk-layout-grid-item-columnspan-medium-1:last-child'));
     let fauxButtonD = nearButton.findElement(By.css('button.uitk-faux-input'));
     await fauxButtonD.click();
      let destinationInput = nearButton.findElement(By.css('input.uitk-field-input.uitk-typeahead-input'));
     await destinationInput.click();
     destinationInput.sendKeys("New Orleans" + Key.ENTER); 
 } catch(error) {
     console.log(error);
 }


 //Set Dates
 try{
    await driver.sleep(2000);
    let fauxButtonD = driver.findElement(By.css('button.uitk-faux-input.uitk-form-field-trigger'));
    await fauxButtonD.click(); //opens calendar field for selecting dates
    await driver.sleep(1000);
    let months = await driver.findElements(By.className('uitk-new-date-picker-month')); //shows first month after current and next month. in desktop mode 
    let monthButtonBar = await driver.findElement(By.className('uitk-date-picker-menu-pagination-container'));
    let nextMonthButton = await monthButtonBar.findElement(By.css('button:last-child')); //moves calendar to next month
    let previousMonthButton = await monthButtonBar.findElement(By.css('button:first-child')); //moves calendar to previous month
    let selectedMonth = '';

    //loop to find selected month in calendar that only shows two options at a time
    for(let i=0; i < 12; i++) {
        let monthYear = await months[0].findElement(By.css('h2')).getText();
        let month = monthYear.replace(" 2021", "");
        if(month == userDMonth) {
            selectedMonth = month;
            break;
        } else {
            await nextMonthButton.click();
            months = await driver.findElements(By.className('uitk-new-date-picker-month'));
        }
    }

    let dates = await driver.findElements(By.className('uitk-date-picker-day-number'));
    await dates[userDDate].click();
    await dates[userDDate + tripDuration].click();
    await driver.findElement(By.className('dialog-done')).click();
       
    let test = await driver.findElement(By.className('uitk-spacing-padding-medium-blockstart-three'));
await fauxButtonD.submit();

    
    // let weeks = await months.findElement(By.tagName('tbody'));
    // let days = 
    // days.click();
    // for (let i=0; i < months.length; i++) {
    //     console.log(months[i].innerText);
    // }

 } catch(error) {
     console.log(error);
     // (await driver).quit();
 }
})();
