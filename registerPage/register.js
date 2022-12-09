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
