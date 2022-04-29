class MainApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  }

  async signUp(email, password, name) {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    });
    return this._checkResponse(response)
  }

  async signIn(email, password) {
    const response = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      })
    });
    return this._checkResponse(response)
  }

  async getUserData(token) {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    return this._checkResponse(response)
  }
}

export default new MainApi('https://api.roy.news.students.nomoreparties.sbs');
