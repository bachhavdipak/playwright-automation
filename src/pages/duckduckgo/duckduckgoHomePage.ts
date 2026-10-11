import { Page } from '@playwright/test';
import BaseObject from '../../helper/baseModules/baseObject';
import { TestDataManager } from '../../helper/dataHandler/testDataManager';
import environments from '../../resources/env/environment';
import { SelectorType } from '../../helper/locator/selectorType';
import Selector from '../../helper/locator/selectors';
require('dotenv').config();

const log = console.log;

export default class DuckduckgoHomePage extends BaseObject {
  private readonly testDataManager = new TestDataManager();

  constructor(page: Page) {
    super(page);
  }

  public Elements = {
    searchBox: new Selector(SelectorType.Locator, 'input#searchbox_input'),
    searchButton: new Selector(
      SelectorType.Locator,
      'button.iconButton_button__A_Uiu.searchbox_searchButton__LxebD',
    ),
    menuOption: new Selector(SelectorType.Role, 'button', { name: 'Menu' }),
  };

  async navigateToHomePage() {
    try {
      const ENV = process.env.ENVIRONMENT.split('-');
      const REGION = ENV[1];
      const BASEURL = environments[ENV[0]]?.[REGION]?.base?.url;

      console.log('~~~~~~ BASEURL ~~~~~~~~ :: => ', BASEURL);
      await this.goto(BASEURL);
    } catch (error) {
      console.error(`Error navigating to Duckduckgo home page: ${error}`);
    }
  }

  async searchContents() {
    try {
      await this.clickElement(this.Elements.menuOption);
      await this.inputText(
        this.Elements.searchBox,
        this.testDataManager.getTestInputRegionData('inputString'),
      );

      await this.clickElement(this.Elements.searchButton);
    } catch (error) {
      console.error(`Error in search context: ${error}`);
    }
  }
}
