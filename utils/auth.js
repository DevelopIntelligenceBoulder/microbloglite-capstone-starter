const apiBaseURL = "https://microbloglite.cyclic.app";

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
  return await fetch(apiBaseURL + "/auth/login", options)
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

  return await fetch(apiBaseURL + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); //log the logout message
      window.sessionStorage.removeItem("user-data");
      window.localStorage.removeItem("user-data");
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
let isLoggedIn = () => "token" in getLocalUserData();
