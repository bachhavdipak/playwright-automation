import { test, expect, APIRequestContext } from '@playwright/test';
import ResponseAssertion from '../../../helper/apiServices/responseAssertion';
import ApiClient from '../../../helper/apiServices/apiClient';
import { TestDataManager } from '../../../helper/dataHandler/testDataManager';
import environments from '../../../resources/env/environment';
import { LoggerManager } from '../../../hooks/pageFixture';
require('dotenv').config();

let apiContext: APIRequestContext;
let apiClient: ApiClient; // Create an instance of the ApiClient
let response;
let assert = new ResponseAssertion();

const testDataManager = new TestDataManager();
const ENV = process.env.ENVIRONMENT.split('-');
const REGION = ENV[1];
const PROJECT = process.env.PROJECT;

test('User record validation based on valid email id', async function () {
  const baseUrl = environments[ENV[0]]?.[REGION]?.[PROJECT]?.get?.base?.url;

  console.log('~~~~~~~~~ baseUrl ~~~~~~~~~~~:', baseUrl);

  apiClient = new ApiClient(baseUrl);

  try {
    response = await apiClient.get(`/users?page=1`);
    console.log('Response:', response.json);

    if (!response.ok) {
      console.error('Request failed with status:', response.status());
      throw new Error(`Request failed with status ${response.status()}`);
    }
  } catch (error) {
    console.error('Error making the request:', error);
    throw error; // Rethrow the error to fail the test in case of a request failure
  }

  const responseBody = await response.text();

  console.log('Status Code:', response.status);

  console.log('responseBody', responseBody);

  const assertionResult = await assert.assertString(responseBody, 'george.bluth@reqres.in');
  expect(assertionResult).toBeTruthy();
});

test('Create user with valid data', async function () {
  LoggerManager.logger.info('the valid endpoint with payload to create user');

  const baseUrl = environments[ENV[0]]?.[REGION]?.[PROJECT]?.post?.base?.url;
  console.log('baseURl:', baseUrl);
  apiClient = new ApiClient(baseUrl); // Set the base URL for the API

  LoggerManager.logger.info('the request is sent to the server');

  const inputPayload = JSON.parse(testDataManager.getTestInputRegionData('apidata.inputRequest'));

  response = await apiClient.post('/api/users', inputPayload);

  LoggerManager.logger.info('the new user must be created with the name');

  if (!response.ok) {
    console.error('Request failed with status:', response.status);
    throw new Error(`Request failed with status ${response.status}`);
  }

  console.log('Status Code:', response.status);

  const responseBody = await response.text();
  console.log('responseBody', responseBody);

  const jsonResponse = JSON.parse(responseBody);
  console.log('Name:', jsonResponse.name);
  expect(jsonResponse.name).toEqual('Dipak');
});
