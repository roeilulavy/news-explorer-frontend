class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.token;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error ${response.status}, ${response.statusText}`);
  }

}

export default new Api({
  baseUrl: "https://api.roy-server.students.nomoreparties.sbs",
});
