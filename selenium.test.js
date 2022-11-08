const { Builder, By, Key, until } = require("selenium-webdriver");
require("dotenv").config();

describe("", () => {
    let driver;

    beforeAll(async() => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    afterAll(async() => {
        await driver.quit();
    });

    const setDelay = async () => {
        await driver.sleep(1000)
    }

    it("Should open homepage", async () => {
        await driver.get(process.env.url);
        await driver.getTitle().then((title) => {
            expect(title).toEqual('Home');
        });
        setDelay();
    });

    it("Should open contact page", async () => {
        await driver.get(driver.getCurrentUrl());
        const contact = await driver.findElement(By.name('contact'));
        await contact.click()
        await driver.getTitle().then((title) => {
            expect(title).toEqual('Contact Us');
        });
        setDelay();
    });

    it("Should navigate to contact page and sign up for more info via email", async () => {
        await driver.get(driver.getCurrentUrl());
        const contact = await driver.findElement(By.name('contact'));
        await contact.click();
        const input = await driver.findElement(By.id('email'));
        await input.sendKeys('test@gmail.com', Key.TAB);
        const btn = await driver.findElement(By.className('btn-info'));
        await btn.click()
        await setDelay();
        let element = await driver.findElement(By.id('message'));
        expect(await driver.findElement(By.id('message')).getText()).toEqual('More info coming to test@gmail.com');
    });
})