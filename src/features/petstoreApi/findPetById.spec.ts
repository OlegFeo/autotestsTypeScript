import { expect, test } from '@playwright/test';

import { Petstore } from '../../clients/petstoreClients/petstore';
import { AddNewPet } from '../../shared/generateTestData/addNewPet';
import { delay } from '../../shared/utils/delay';

//ТЕСТЫ НА ПОЛУЧЕНИЕ ДАННЫХ

test('Успешное получение информации о питомце', async () => {
  console.log('Успешное получение информации о питомце');
  //arrange
  console.log('Создаем питомца для теста');
  await AddNewPet.addNewPet()
  delay(2000)

  //act
  console.log('Делаем запрос о питомце');
  const {data: checkResponse, status } = await Petstore.getPetById('1');

  //assert
  console.log('Проверяем данные о питомце');
  expect.soft(status).toBe(200);
  expect.soft(checkResponse.id).toEqual(1);
  expect.soft(checkResponse.category.id).toEqual(1);
  expect.soft(checkResponse.category.name).toEqual('dog');
  expect.soft(checkResponse.name).toEqual('Taxa');
  expect.soft(checkResponse.photoUrls).toEqual([]);
  expect.soft(checkResponse.tags).toEqual([]);
  expect.soft(checkResponse.status).toEqual('sleep');
});
