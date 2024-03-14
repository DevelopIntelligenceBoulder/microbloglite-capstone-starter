window.onload = () => {
  if (isLoggedIn()) populatePage();
  else window.location.replace("../");
};

function populatePage() {
  populateMenu()

  const loginData = getLocalUserData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(API_URL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      let postsContainer = document.getElementById("posts");
      for (let post of posts) {
        let postElem = createPostElem(post);
        postsContainer.appendChild(postElem);
      }
    });
}

function populateMenu (){
    document.getElementById("logoutBtn").onclick = logout; //init logout btn
    document.getElementById("loginName").innerHTML = getLocalUserData().username
}

let createPostElem = (post) => {
  let div = document.createElement("div");
  div.innerHTML = `<div class="card justify-content-center " style="width:18 rem;">
          <div class="card-body ">
            <h5 class="card-title">${post.username}</h5>
            <p class="card-text" >${post.text}</p>
            <a class="btn text-primary">Love it</a>
            <a class="btn text-danger-emphasis">Fudge it</a>
          </div>
         </div>`;
  return div;
};

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
