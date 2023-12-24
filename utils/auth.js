const apiBaseURL = "https://microbloglite.cyclic.app";

// Retrive login data from local storage
let getLoginData = () => {
  let userData = window.localStorage.getItem("user-data");
  return JSON.parse(userData) || {};
};

// Checks if use login token is saved locally
let isLoggedIn = () => "token" in getLoginData();

// POST /auth/login
async function login(loginData) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  };

  return await fetch(apiBaseURL + "/auth/login", options)
    .then((res) => res.json())
    .then((userData) => {
      window.localStorage.setItem("user-data", JSON.stringify(userData));
      window.location.assign("/posts"); // redirect to posts
      return userData;
    });
}

// GET /auth/logout
async function logout() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  return await fetch(apiBaseURL + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => data)
    .finally(() => {
      window.localStorage.removeItem("user-data");
      window.location.assign("/"); // redirect back to landing page
    });
}
