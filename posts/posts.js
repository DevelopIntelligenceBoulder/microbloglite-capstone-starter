"use strict";

window.onload = function () {
  getAllPost();
};

function getAllPost() {
  return fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0"
  )
    .then((response) => response.json())
    .then((data) => loadAllPost(data))
    .catch((error) => {
      console.error("Error fetching users:", error);
    });

}

const parentElement = document.querySelector("main")

function loadAllPost(posts) {

  for(post of posts) {
    
    const mainCard = document.createElement("div")
      mainCard.classList.add("mainCard")
      parentElement.append(mainCard)

  }
}
