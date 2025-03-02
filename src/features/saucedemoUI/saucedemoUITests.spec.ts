import { expect, test } from '@playwright/test';
import config from '../../config';
import { SaucedemoUI } from '../../clientsUI/saucedemoClients/saucedemo';


//ТЕСТИРУЕМ ЧТО МОЖНО СДЕЛАТЬ РАЗЛОГИН С САЙТА

test('Проверка, что можно разлогинится с сайта', async ({page}) => {
  //act
  console.log('Заходим на сайт saucedemo.ts');
  await page.goto(config.saucedemo);

  console.log('Логин за тестового пользователя');
  await SaucedemoUI.login(page);

  console.log('Логаут за тестового пользователя');
  await SaucedemoUI.logout(page);

  //assert
  console.log('Проверка, что мы на странице логина');
  await expect(page).toHaveURL('https://www.saucedemo.com/')

});

//await page.pause();
