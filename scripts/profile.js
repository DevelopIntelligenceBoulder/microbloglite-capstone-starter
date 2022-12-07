const $q = (s) => document.querySelector(s);
const textField = $q("#textField");
const postBtn = $q("#postBtn");
const form = $q("form");
const cardSection = $q("#card-section");
const logoutButton = $q("#logoutButton");
const bioName = $q("#user-name");

const loginData = getLoginData();

function getLoginData() {
  return JSON.parse(window.localStorage.getItem("login-data")) || {};
}

function createPost(event) {
  event.preventDefault();
  const bodyData = {
    text: textField.value,
  };

  fetch("https://microbloglite.herokuapp.com/api/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "./profile-page.html"
    })
    .catch((err) => {
      console.log(err);
    });
}
function displayProfilePost() {
  const postAPI = "https://microbloglite.herokuapp.com/api/posts";
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  const profileUserName = loginData.username;

  fetch(postAPI, options)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        if (profileUserName == post.username) {
          buildPostCard(cardSection, post);
        }
      });
    });
}

function buildPostCard(section, data) {
  //create col div for BS
  const colDiv = document.createElement("div");
  colDiv.className = "col";

  //created the card
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  //put the colDiv on the card-section div then put cardDiv inside colDiv
  section.appendChild(colDiv);
  colDiv.appendChild(cardDiv);

  //create card title for username
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.innerText = data.username;

  //create card div text for the card body
  const cardTextPara = document.createElement("p")
  cardTextPara.className = "card-text"
  cardTextPara.innerText = data.text

  //create the .card-body div to plant the card-text div
  const divCardBody = document.createElement("div");
  divCardBody.className = "card-body";

  cardDiv.appendChild(divCardBody);
  divCardBody.append(cardTitle, cardTextPara);
}

function loadName() {
  userName.innerText = loginData.username;
  bioName.innerText = `@${loginData.username}`;
}

function logout() {
  const loginData = getLoginData();
  const api = "https://microbloglite.herokuapp.com";


  // GET /auth/logout
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(api + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      // We're using `finally()` so that we will continue with the
      // browser side of logging out (below) even if there is an
      // error with the fetch request above.

      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("/index.html"); // redirect to landing page
    });
}

window.onload = () => {
  loadName();
  displayProfilePost();
  form.onsubmit = createPost;


  logoutButton.onclick = logout;
};
