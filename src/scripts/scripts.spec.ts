import { test } from '@playwright/test';

import { CamundaReturnClient } from '../clients/camundaReturnsClients/camundaReturnClient';
import { LogisticBFF } from '../clients/logisticBFFClients/logisticBFF';
import { OmsOrdersPostMarketplaceDataDto } from '../clients/omsOrdersPostMarketplaceClient/dto/omsOrdersPostMarketplaceDataDto';
import { pbProxy } from '../clients/returnClients/pbProxyClients';
import orderDataFixture from '../shared/generators-builder/orderBuilder/fixtures/orderData.json';
import orderDataCashFixture from '../shared/generators-builder/orderBuilder/fixtures/orderDataCash.json';
import { OrderBuilder } from '../shared/generators-builder/orderBuilder/orderBuilder';

const orderData = orderDataFixture as OmsOrdersPostMarketplaceDataDto;

test('генератор оплаченного наличными заказа', async () => {
  const orderDataCash = orderDataCashFixture as OmsOrdersPostMarketplaceDataDto;
  const orderContext = await OrderBuilder.createOrder(orderDataCash);
  console.log(orderContext);
});

test('генератор оплаченного заказа', async ({ page }) => {
  const orderContext = await OrderBuilder.createPaidOrder(page, orderData);
  console.log(orderContext);
});

test('генератор оплаченного заказа отправленного от мерчанта', async ({ page }) => {
  const orderContext = await OrderBuilder.createPaid3PLOrder(page, orderData);
  console.log(orderContext);
});

test('генератор оплаченного заказа у клиента', async ({ page }) => {
  const orderContext = await OrderBuilder.createPaid3PLOrder(page, orderData);
  const { parcelId } = orderContext;
  await LogisticBFF.changeStatus(parcelId, 'atClient');
  await pbProxy.checkPaymentBrickStatus(orderContext.orderNumber, 2);
  console.log(orderContext);
});

test('генератор оплаченной отмены до отгрузки', async ({ page }) => {
  const orderContext = await OrderBuilder.createPaidOrder(page, orderData);
  const { parcelId } = orderContext;
  await LogisticBFF.cancelBeforeShipmentParcel(parcelId, 'canceledByClient', '659e79faa8e266a4f2fac815');
  console.log(orderContext);
});

test('генератор оплаченного агентского возврата', async ({ page }) => {
  const orderContext = await OrderBuilder.createPaid3PLOrder(page, orderData);
  const { parcelId } = orderContext;
  await LogisticBFF.agentReturn(parcelId, 'canceledByClient');
  console.log(orderContext);
});

test('генератор оплаченного клиентского возврата', async ({ page }) => {
  //TODO 5
  const orderContext = await OrderBuilder.createPaid3PLOrder(page, orderData);
  await LogisticBFF.changeStatus(orderContext.parcelId, 'atClient');
  await pbProxy.checkPaymentBrickStatus(orderContext.orderNumber, 2);
  await LogisticBFF.changeStatus(orderContext.parcelId, 'atClient');
  await LogisticBFF.clientReturn(
    orderContext.orderId,
    orderContext.parcelId,
    orderContext.orderNumber,
    orderContext.parcelNumber,
  );
  //TODO END
  console.log(orderContext);
});

test('генератор неоплаченного заказа', async () => {
  const orderContext = await OrderBuilder.createOrder(orderData);
  console.log(orderContext);
});

test('генератор неоплаченного заказа отправленного от мерчанта', async () => {
  const orderContext = await OrderBuilder.createUnpaid3PLOrder(orderData);
  console.log(orderContext);
});

test('генератор неоплаченного в заказа у клиента', async () => {
  const orderContext = await OrderBuilder.createUnpaid3PLOrder(orderData);
  const { parcelId } = orderContext;
  await LogisticBFF.changeStatus(parcelId, 'atClient');
  console.log(orderContext);
});

test('генератор неоплаченной отмены до отгрузки', async () => {
  const orderContext = await OrderBuilder.createOrder(orderData);
  const { parcelId } = orderContext;
  await LogisticBFF.cancelBeforeShipmentParcel(parcelId, 'canceledByClient', '659e79faa8e266a4f2fac815');
  console.log(orderContext);
});

test('генератор неоплаченного агентского возврата', async () => {
  const orderContext = await OrderBuilder.createUnpaid3PLOrder(orderData);
  await LogisticBFF.agentReturn(orderContext.parcelId, 'canceledByClient');
  console.log(orderContext);
});

test('генератор неоплаченного клиентского возврата', async () => {
  const orderContext = await OrderBuilder.createUnpaid3PLOrder(orderData);
  await LogisticBFF.changeStatus(orderContext.parcelId, 'atClient');
  await LogisticBFF.clientReturn(
    orderContext.orderId,
    orderContext.parcelId,
    orderContext.orderNumber,
    orderContext.parcelNumber,
  );
  console.log(orderContext);
});

test('автоприемка возврата', async () => {
  const returnNumber = 'RP2347593-001-001'
  await CamundaReturnClient.fiveDaysPassed(returnNumber);
});
