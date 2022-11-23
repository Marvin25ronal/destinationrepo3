const SELENIUM_HOST = `http://192.168.1.54:4444/wd/hub`;

const webdriver = require('selenium-webdriver');

const remote = require('selenium-webdriver/remote');

const By = webdriver.By;

const capabilities = {
    "browserName": "chrome",
    "browserVersion": "102.0",
    "platformName": "LINUX",
    "se:noVncPort": 7900,
    "se:vncEnabled": true,
    "se:recordVideo": "true",
    "se:screenResolution": "1920x1080"
}

const driver = new webdriver.Builder()
    .usingServer(SELENIUM_HOST)
    .withCapabilities(capabilities)
    .build();

driver.setFileDetector(new remote.FileDetector())
const urlformulario = 'https://testpages.herokuapp.com/styled/basic-html-form-test.html';

const timeout = 15000;

const llenar_formulario = async (done) => {
    try {
        await driver.get(urlformulario);
        await driver.wait(webdriver.until.titleIs('HTML Form Elements'), timeout)
        await driver.findElement(By.name('username')).sendKeys('Marvin');
        await driver.findElement(By.name('password')).sendKeys('123')
        await driver.findElement(By.name('comments')).sendKeys('Este es un comentario')
        //await driver.findElement(By.name('filename')).sendKeys('E:\\Datos\\Trabajo\\capacitacion\\node-mocha-chai\\persona1.jpg')
        await driver.findElement(By.xpath('//*[@id="HTMLFormElements"]/table/tbody/tr[5]/td/input[1]')).click();
        await driver.findElement(By.xpath('//*[@id="HTMLFormElements"]/table/tbody/tr[5]/td/input[3]')).click();
        await driver.findElement(By.xpath('//*[@id="HTMLFormElements"]/table/tbody/tr[5]/td/input[2]')).click();
        await driver.findElement(By.xpath('//*[@id="HTMLFormElements"]/table/tbody/tr[6]/td/input[2]')).click();
        let number = Math.floor(Math.random() * 4) + 1
        console.log(number)
        await driver.findElement(By.xpath('//*[@id="HTMLFormElements"]/table/tbody/tr[7]/td/select/option[' + number + ']')).click();
        await driver.findElement(By.name('dropdown')).click()
        await driver.findElement(By.xpath(`//*[@id="HTMLFormElements"]/table/tbody/tr[8]/td/select/option[${number}]`)).click()
        await driver.findElement(By.xpath('//*[@id="HTMLFormElements"]/table/tbody/tr[9]/td/input[2]')).click()
        await driver.wait(webdriver.until.titleIs('Processed Form Details'), timeout)
        let title = await driver.getTitle()
        if (title.match('Processed Form Details')) {
            console.log('Formulario llenado correctamente')
            await driver.sleep(10000)
            done()
        }
        

    }
    catch (error) {
        throw new Error
    } finally {
        await driver.quit();
    }
}
module.exports = {
    llenar_formulario
}