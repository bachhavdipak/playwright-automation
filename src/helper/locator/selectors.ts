import { SelectorType } from './selectorType';

export default class Selector {
  private readonly _selectorType: SelectorType;
  private readonly _selectorString: string;
  private readonly _roleOptions?: { name: string };

  constructor(selectorType: SelectorType, selectorString: string, roleOptions?: { name: string }) {
    this._selectorType = selectorType;
    this._selectorString = selectorString;
    this._roleOptions = roleOptions;
  }

  public get selectorType() {
    return this._selectorType;
  }

  public get selectorString() {
    return this._selectorString;
  }

  public get roleOptions() {
    return this._roleOptions;
  }
}
