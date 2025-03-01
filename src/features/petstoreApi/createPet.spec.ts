import { expect, test } from '@playwright/test';

import { Petstore } from '../../clients/petstoreClients/petstore';
import { delay } from '../../shared/utils/delay';

//ТЕСТЫ НА СОЗДАНИЕ ПИТОМЦА

test('Успешное создание питомце', async () => {
  //act
  console.log('Создаем питомца для теста');
  await Petstore.addPet(1, { id: 1, name: 'dog' }, 'Taxa', [], [], 'sleep');
  delay(2000)

  //assert
  console.log('Проверяем, что питомец успешно создан');
  const {data: checkResponse, status } = await Petstore.getPetById('1');
  expect.soft(status).toBe(200);
  expect.soft(checkResponse.id).toEqual(1);
  expect.soft(checkResponse.category.id).toEqual(1);
  expect.soft(checkResponse.category.name).toEqual('dog');
  expect.soft(checkResponse.name).toEqual('Taxa');
  expect.soft(checkResponse.photoUrls).toEqual([]);
  expect.soft(checkResponse.tags).toEqual([]);
  expect.soft(checkResponse.status).toEqual('sleep');
});
