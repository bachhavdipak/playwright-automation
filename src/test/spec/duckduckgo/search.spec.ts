import { test } from '@playwright/test';
import { LoggerManager } from '../../../hooks/pageFixture';
import duckduckgoHomePage from '../../../pages/duckduckgo/duckduckgoHomePage';

let homePage: duckduckgoHomePage;

test('See search results', { tag: ['@pending'] }, async ({ page }) => {
  LoggerManager.logger.info('User landing on a DuckDuckGo home page');
  homePage = new duckduckgoHomePage(page);
  await homePage.navigateToHomePage();

  LoggerManager.logger.info('User click seacrh buttong after entering string in the search bar');
  await homePage.searchContents();
});

test('See search results0', { tag: ['@smoke'] }, async ({ page }) => {
  LoggerManager.logger.info('User landing on a DuckDuckGo home page');
  homePage = new duckduckgoHomePage(page);
  await homePage.navigateToHomePage();

  LoggerManager.logger.info('User click seacrh buttong after entering string in the search bar');
  await homePage.searchContents();
});

test('See search results2', { tag: ['@regression'] }, async ({ page }) => {
  LoggerManager.logger.info('User landing on a DuckDuckGo home page');
  homePage = new duckduckgoHomePage(page);
  await homePage.navigateToHomePage();

  LoggerManager.logger.info('User click seacrh buttong after entering string in the search bar');
  await homePage.searchContents();
});

test('See search results3', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
  LoggerManager.logger.info('User landing on a DuckDuckGo home page');
  homePage = new duckduckgoHomePage(page);
  await homePage.navigateToHomePage();

  LoggerManager.logger.info('User click seacrh buttong after entering string in the search bar');
  await homePage.searchContents();
});
