export const BASE_URL = 'https://api.roy.news.students.nomoreparties.sbs';

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
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
      Accept: 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "email": email, "password": password,}),
  })
  .then(checkResponse)
  .then((data) => {
    if (data) {
      localStorage.setItem("jwt", data);
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
};
