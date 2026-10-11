import * as winston from 'winston';
import * as fs from 'fs';
require('dotenv').config();

const filePath = `${process.cwd()}/src/resources/test-data/${process.env.PROJECT}/`;
const ENV = process.env.ENVIRONMENT.split('-');
const region = ENV[1];

const Logger = {
  logger: winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  }),
};

class TestDataManager {
  private jsonObject: any;

  constructor() {
    this.jsonObject = {};
  }

  getJsonData(fileName: string): any {
    try {
      const fileInput = fs.readFileSync(`${filePath}${fileName}`, 'utf8');

      this.jsonObject = JSON.parse(fileInput);
    } catch (e) {
      Logger.logger.error(`Error reading JSON file ${filePath}${fileName}: ${e.message}`);

      throw e;
    }
    return this.jsonObject;
  }

  getJsonValue(fileName: string, key: string): any {
    const jsonData = this.getJsonData(fileName);
    const keys = key.split('.');

    let value = jsonData;

    for (const k of keys) {
      if (value?.[k]) {
        value = value[k];
      } else {
        console.log(`Property "${key}" does not exist in jsonData.`);
        return undefined;
      }
    }
    return value;
  }

  getTestInputRegionData(key: string) {
    return this.getJsonValue(`TestInputs/${region}`, key);
  }

  getTestInputFeatureData(key: string) {
    const feature = this.getJsonValue(`Features/${region}`, key);
    return !!feature;
  }

  getTestAssertionData(key: string) {
    return this.getJsonValue(`AssertionData/${region}`, key);
  }
}

export { Logger, TestDataManager };
