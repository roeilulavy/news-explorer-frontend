
const API_KEY = '36f3ba6eab1248458532031a692e7f8b';
// const BASE_URL = 'https://newsapi.org/v2/everything';
const BASE_URL = 'https://nomoreparties.co/news/v2/everything';

class NewsApi {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Something went wrong:  ${response.status}`);
  }

  async getArticles(searchKeyword, fromDate, toDate) {
    const response = await fetch(`${this.baseUrl}?q=${searchKeyword}&sortBy=popularity&from=${fromDate}&to=${toDate}&pageSize=100&apiKey=${this.apiKey}`);

    return this._checkResponse(response);
  }
}

export default new NewsApi(BASE_URL, API_KEY)
