const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

//------ End Boilerplate -------//

beforeAll(async () => await driver.get('http://127.0.0.1:5500/movieList/index.html'));

afterAll(async () => await driver.quit());

//----- Pulled from code-along
test('add a movie', async () => {
   const searchTerm = 'Tenet';

   const inputField = await driver.findElement(By.xpath('//input'));
   await inputField.sendKeys('Tenet');
   // await driver.sleep(2000);

   const movieButton = await driver.findElement(By.css('button'));
   await movieButton.click();
   // await driver.sleep(2000);

   const theResult = await driver.findElement(By.xpath('//li/span')).getText();

   expect(theResult).toBe(searchTerm);
});
//------- End code-along code


test('test marking movie as completed', async () => {
   let movieClass = await driver.findElement(By.xpath('//li/span')).getAttribute('class');
   expect(movieClass).toBe('');
   const movieToMark = await driver.findElement(By.xpath('//li/span'));
   await movieToMark.click();
   movieClass = await driver.findElement(By.xpath('//li/span')).getAttribute('class');
   expect(movieClass).toBe('checked');
});

test('test unmarking movie as completed', async () => {
   const movieToMark = await driver.findElement(By.xpath('//li/span'));
   await movieToMark.click();
   movieClass = await driver.findElement(By.xpath('//li/span')).getAttribute('class');
   expect(movieClass).toBe('');
});

test('test remove button', async () => {
   const deleteButton = await driver.findElement(By.xpath('//li/button'));
   await deleteButton.click();
   const deleteMessage = await driver.findElement(By.id('message')).getText();
   expect(deleteMessage).toBe('Tenet deleted!')
});
