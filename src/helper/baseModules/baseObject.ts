import { Page } from '@playwright/test';
import { SelectorType } from '../locator/selectorType';
import Selector from '../locator/selectors';
import BaseAssertion from './baseAssertion';

const path = require('path');

export default class BaseObject extends BaseAssertion {
  constructor(page?: Page) {
    super(page);

    if (!page) {
      throw new Error('Page object is not provided');
    }

    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async getElement(selector: Selector) {
    let element;
    switch (selector.selectorType) {
      case SelectorType.Id:
        element = this.page.getByTestId(selector.selectorString);
        break;
      case SelectorType.Label:
        element = this.page.getByLabel(selector.selectorString);
        break;
      case SelectorType.Placeholder:
        element = this.page.getByPlaceholder(selector.selectorString);
        break;
      case SelectorType.Title:
        element = this.page.getByTitle(selector.selectorString);
        break;
      case SelectorType.Locator:
        element = this.page.locator(selector.selectorString);
        break;
      case SelectorType.Text:
        element = this.page.getByText(selector.selectorString);
        break;
      case SelectorType.Role:
        if (this.isValidRole(selector.selectorString)) {
          element = this.page.getByRole(selector.selectorString, selector.roleOptions);
        } else {
          throw new Error(`Invalid role: ${selector.selectorString}`);
        }
        break;
      case SelectorType.AltText: {
        element = this.page.getByAltText(selector.selectorString);
        break;
      }
      default:
        throw new Error('Invalid selector type');
    }
    return element;
  }

  isValidRole(
    role: string,
  ): role is
    | 'alert'
    | 'button'
    | 'checkbox'
    | 'combobox'
    | 'dialog'
    | 'link'
    | 'textbox'
    | 'treeitem'
    | 'navigation'
    | 'tab'
    | 'listbox'
    | 'menu'
    | 'menubar'
    | 'radiogroup'
    | 'row'
    | 'tablist'
    | 'tabpanel'
    | 'tooltip' {
    const validRoles = new Set([
      'alert',
      'button',
      'checkbox',
      'combobox',
      'dialog',
      'link',
      'textbox',
      'treeitem',
      'navigation',
      'tab',
      'listbox',
      'menu',
      'menubar',
      'radiogroup',
      'row',
      'tablist',
      'tabpanel',
      'tooltip',
    ]);
    return validRoles.has(role);
  }

  async clickElement(selector: Selector) {
    const element = await this.getElement(selector);
    await element.waitFor({ state: 'attached', timeout: 30000 });
    await element.click();
  }

  async inputText(selector: Selector, value: string) {
    const element = await this.getElement(selector);
    await element.waitFor({ state: 'visible', timeout: 30000 });
    await element.fill(value);
  }

  async getElementText(selector: Selector) {
    const element = await this.getElement(selector);
    await element.waitFor({ state: 'visible', timeout: 60000 });
    return await element.first().textContent();
  }

  async waitForLoadingIconToDisappear() {
    try {
      while (true) {
        const ajaxIsComplete = await this.page.evaluate(() => {
          return (window as any).jQuery.active === 0;
        });

        if (ajaxIsComplete) {
          break;
        }
        await this.page.waitForTimeout(20000);
      }
    } catch (error) {
      console.error(`Error waiting for loading icon to disappear: ${error}`);
    }
  }
}
