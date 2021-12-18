const pup = require("puppeteer");
const select = require ('puppeteer-select');

async function openBrowser(){
    const browser = await pup.launch({
        headless: false,          //visibility of browser 
        args:[
            '--start-fullscreen' // to full screen the browser
         ],
        defaultViewport: false ,  //full screen of web page
        slowMo: 50,
    });
    const tabs = await browser.pages();
    const tab = tabs[0];
    await tab.goto("https://www.flipkart.com/");   //open flipkart page
    
    await tab.waitForSelector('[class="_2IX_2- VJZDxU"]');
    let mailInput = await tab.$('[class="_2IX_2- VJZDxU"]');
    await mailInput.click();
    await mailInput.type("gkaran612@gmail.com")    //type mail id

    let passwordInput = await tab.$('[class="_2IX_2- _3mctLh VJZDxU"]');
    await passwordInput.click();
    await passwordInput.type("sonu1999gupta");     //type password

    let loginClick = await tab.$('[class="_2KpZ6l _2HKlqd _3AWRsL"]');
    await loginClick.click();                      //click on login button

    await tab.waitForTimeout(2000);

    await tab.waitForSelector('[title="Search for products, brands and more"]');
    let searchInput = await tab.$('[title="Search for products, brands and more"]');
    await searchInput.click();                     //click on search tab
    await searchInput.type("torch");               //type product on search tab 
 
    await tab.keyboard.press("Enter");             //press enter on keyboard

    await tab.waitForTimeout(2000);

    await tab.waitForSelector("._10UF8M");
    let sortingTypes = await tab.$$("._10UF8M");
    // console.log(await sortingTypes.length); //5
    await sortingTypes[1].click();                  //click on popularity (sort by)

    await tab.evaluate( () => {
        window.scrollBy(0, window.innerHeight);     //scroll bar
    });                                                 

    // await tab.waitForSelector("._2gmUFU._3V8rao");
    // let availabilityButton = await tab.$$("._2gmUFU._3V8rao");
    // // console.log(await availabilityButton.length);  //23
    // await tab.waitForTimeout(2000);
    // await availabilityButton[17].click();

    // await tab.waitForSelector("._3879cV");
    // let clickAvailabilityButton = await tab.$$("._3879cV");
    // await clickAvailabilityButton[14].click();

    await tab.waitForTimeout(2000);

    await tab.waitForSelector("._1fQZEK");
    let firstProducts = await tab.$$("._1fQZEK");       
    let productUrls = [];                               //get the urls of products from search
    for(let firstProduct of firstProducts){      
        productUrls.push(
            await tab.evaluate(function(ele){
                return "https://www.flipkart.com" + ele.getAttribute("href");
            },firstProduct)
        );
    }
    // console.log(productUrls[0]);  //url of 1st product
    const link = productUrls[0];                    
    await tab.goto(link);                           //click on the 1st product 
    
    await tab.waitForTimeout(2000);
    await tab.waitForSelector("._2KpZ6l._2U9uOA._3v1-ww");
    let addToCart = await tab.$("._2KpZ6l._2U9uOA._3v1-ww");
    await addToCart.click();                        //click on add to cart button

    //For address change but i don't want to
    // await tab.waitForSelector("._12cXX4");   
    // let deliveryAddressBar = await tab.$("._12cXX4");
    // await deliveryAddressBar.click();

    // await tab.waitForSelector(".itIIUM");
    // let addressChange = await tab.$$(".itIIUM");
    // await addressChange[0].click();

    await tab.waitForTimeout(2000);
    await tab.waitForSelector("._2KpZ6l._2ObVJD._3AWRsL");
    let placeOrderButton = await tab.$("._2KpZ6l._2ObVJD._3AWRsL");
    await placeOrderButton.click();                   //click on place order button

    // await tab.waitForTimeout(2000);
    await tab.waitForSelector("._2KpZ6l.RLM7ES._3AWRsL");
    let deliverHereButton = await tab.$("._2KpZ6l.RLM7ES._3AWRsL");
    await deliverHereButton.click();                   //click on deliver here button

    // await tab.waitForTimeout(2000);
    await tab.waitForSelector("._2KpZ6l._1seccl._3AWRsL");
    let continueButton = await tab.$("._2KpZ6l._1seccl._3AWRsL");
    await continueButton.click();                       //click on continue button
    await tab.waitForTimeout(2000);
    // await tab.waitForSelector("._2KpZ6l._1uR9yB._3dESVI");       //for some product only
    // let acceptContinueButton = await tab.$("._2KpZ6l._1uR9yB._3dESVI");
    // await acceptContinueButton.click();

    await tab.waitForSelector("#COD");
    await tab.evaluate(() => {
        document.querySelector("#COD").parentElement.click();    //click on the checkbox of COD
    });
    
    await tab.waitForTimeout(4000);    //for entering captcha

    await tab.waitForSelector("._2KpZ6l.qhlwny._3AWRsL");
    let confirmOrder = await tab.$("._2KpZ6l.qhlwny._3AWRsL");
    await confirmOrder.click();                         //click on confirm order

    await tab.waitForTimeout(2000);     //to reload to confirm order

    await tab.waitForSelector(".N2KxHO");
    let denyNotification = await tab.$(".N2KxHO");
    await denyNotification.click();

    await tab.waitForTimeout(3000); 
    await tab.screenshot({                          //screenshot of the page of order has been placed
        path: 'flipkartOrder.jpg', 
        type: 'jpeg',
        quality: 70 
    });

    await tab.waitForTimeout(2000);
    await tab.close();
    await browser.close();

    // await tab.waitForSelector('.XdpTC-._2GyCkX');
    // let element = await tab.$('.XdpTC-._2GyCkX');
    // let value = await tab.evaluate(el => el.textContent, element);
    // console.log(value);

    // const text = await tab.$eval('*', el => el.innerText);
    // console.log(text);


}
openBrowser();




































