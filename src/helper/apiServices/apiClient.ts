class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request(url: string, method: string, data?: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        // You can add additional headers here
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  }

  public async get(url: string): Promise<any> {
    return this.request(url, 'GET');
  }

  public async post(url: string, data: any): Promise<any> {
    return this.request(url, 'POST', data);
  }

  public async update(url: string, data: any): Promise<any> {
    return this.request(url, 'PUT', data);
  }

  public async delete(url: string): Promise<any> {
    return this.request(url, 'DELETE');
  }
}

export default ApiClient;
