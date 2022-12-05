const api = "https://microbloglite.herokuapp.com";

function getRegisterData() {
  return JSON.parse(window.localStorage.getItem("Register-data")) || {};
}

function getRegister() {
  const registerData = getRegisterData();
  return Boolean(registerData.token);
}

function register(registerData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  };

  return fetch(api + "/auth/register", options)
    .then((response) => response.json())
    .then((registerData) => {
      window.localStorage.setItem(
        "register-data",
        JSON.stringify(registerData)
      );
      window.location.assign("/posts");
    });
}

function register () {
  const registerData = getRegisterData();
  fetch(api + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      // We're using `finally()` so that we will continue with the
      // browser side of logging out (below) even if there is an
      // error with the fetch request above.

      window.localStorage.removeItem("register-data"); // remove login data from LocalStorage
      window.location.assign("/"); // redirect to landing page
    });
}