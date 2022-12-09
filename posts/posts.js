/* Posts Page JavaScript */

"use strict";

const searchTypeDropdown = document.getElementById("search-type-dropdown");
const userDropdown = document.getElementById("user-dropdown");
const userSection = document.getElementById("user-section");


const $q = (s) => document.querySelector(s);

const tbody = $q("#posts-table tbody");

window.onload = () => {
  loadData().then((data) => fillTable(data));
};

function loadData() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      "content-type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  return fetch("https://microbloglite.herokuapp.com/api/posts", options).then(
    (response) => response.json()
  );
}

function selectSearchType() {
  let selectedValue = searchTypeDropdown.value;

  if (selectedValue == "users") {
    loadUserDropdown();
  } else if (selectedValue == "all") {
    loadPosts();
  }
}

function loadUserDropdown() {
  const loginData = getLoginData();
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      "content-type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  userSection.style.display = "block";
  tbody.style.display = "none";

  fetch("https://microbloglite.herokuapp.com/api/users",options)
    .then((response) => response.json())
    .then((users) => {
      for (const user of users) {
        const option = document.createElement("option");
        option.value = user.username;
        option.innerText = user.fullName;
        userDropdown.appendChild(option);
      }
    });
}


function fillTable(posts) {
  console.log(posts);
  for (const post of posts) {
    const row = tbody.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
   
   

    cell3.innerText = post.createdAt;
    cell2.innerText = post.username;
    cell1.innerText = post.text;
   
  }
}
function loadPosts() {
    loadData().then((data)=> {
        console.log(data);
        fillTable(data);
    })
    userSection.style.display = "none"
  tbody.style.display = "block";
}
window.onload = () => {
  searchTypeDropdown.onchange = selectSearchType;
  userDropdown.onchange = loadPosts;
};
