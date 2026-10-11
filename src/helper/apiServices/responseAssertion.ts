export default class ResponseAssertion {
  async assertString(responseBody: string, str: string): Promise<boolean> {
    return responseBody.includes(str);
  }
}
