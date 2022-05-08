export const BASE_URL = 'https://api.roy.news.students.nomoreparties.sbs';

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  console.error("Error: " + response.status +" "+ response.text);
  return Promise.reject(response.status);
}

export const signup = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
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
  })
  .then(checkResponse);
}

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })
  .then(checkResponse)
  .then((data) => {
    if (data) {
      localStorage.setItem("jwt", data.token);
      return data;
    }
  })
}

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "authorization": `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    })
}

export const getUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  })
  .then(checkResponse);
}

export const saveArticle = (keyWord, title, text, date, source, link, image, token) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "keyword": keyWord,
      "title": title,
      "text": text,
      "date": date,
      "source": source,
      "link": link,
      "image": image,
    })
  })
  .then(checkResponse);
}

export const getSavedArticles = (token) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  .then(checkResponse);
}

export const deleteArticle = (token, id) => {
  return fetch(`${BASE_URL}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  .then(checkResponse);
}
