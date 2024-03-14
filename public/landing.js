window.onload = () => {
  if (isLoggedIn() === true) window.location.replace("../posts");
  else loginHandler();
};

function loginHandler() {
  const loginForm = document.querySelector("#login");
  const errorMsg = document.querySelector("#errorMsg");
  const loadingSpinner = document.querySelector("#loadingSpinner");

  // Disable login button and process the login function in auth.js//
  loginForm.onsubmit = (event) => {
    // Get and read login form data
    let loginData = {
      username: loginForm.username.value,
      password: loginForm.password.value,
      remember: loginForm.remember.checked,
    };

    event.preventDefault();
    setLoadingState();
    login(loginData).then(successRedirect).catch(setFailureState);
  };

  // Actions
  function successRedirect() {
    window.location.replace("../posts");
  }
  function setLoadingState() {
    loginForm.loginButton.disabled = true;
    loadingSpinner.classList.remove("visually-hidden");
    errorMsg.classList.add("content-visable-hidden");
  }
  function setFailureState() {
    loginForm.loginButton.disabled = false;
    loadingSpinner.classList.add("visually-hidden");
    errorMsg.classList.remove("content-visable-hidden");
    loginForm.password.value = "";
    loginForm.username.value = "";
    loginForm.username.focus();
  }
}

const API_URL = "https://microbloglite.onrender.com";

// POST /auth/login
async function login(loginData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  // Saves login data if success and throws an error otherwise
  return await fetch(API_URL + "/auth/login", options)
    .then((res) => res.json())
    .then((userData) => {
      if (userData.statusCode === 200) storeLocalUserData(userData, loginData);
      else throw new Error("Login failed with code: " + userData.statusCode);
    });
}

// GET /auth/logout
async function logout() {
  const loginData = getLocalUserData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  return await fetch(API_URL + "/auth/logout", options).then(() => {
    window.sessionStorage.removeItem("user-data");
    window.localStorage.removeItem("user-data");
    window.location.assign("../");
  });
}

// Retrive login data from session storage
let getLocalUserData = () => {
  // Checks for user-data and gives empty if not found
  let userData =
    window.sessionStorage.getItem("user-data") ||
    window.localStorage.getItem("user-data") ||
    "{}";
  return JSON.parse(userData);
};

let storeLocalUserData = (userData, loginData) =>
  loginData.remember
    ? window.localStorage.setItem("user-data", JSON.stringify(userData))
    : window.sessionStorage.setItem("user-data", JSON.stringify(userData));
// Checks if use login token is saved locally
let isLoggedIn = () => getLocalUserData().token;
