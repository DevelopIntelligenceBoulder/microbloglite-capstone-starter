"use strict";

window.onload = function () {
  getAllPost();
};

function getAllPost(accessPost) {
  const options = {
    method: "POST",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accessPost),

  };
  
  return fetch(apiBaseURL + "api/posts" + options)
    .then((response) => response.json())
    .then((data) => {
      loadAllPost(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
}

const parentElement = document.querySelector("main");

function loadAllPost(posts) {
  for (post of posts) {
    const mainCard = document.createElement("div");
    mainCard.classList.add("mainCard");
    parentElement.append(mainCard);
  }
}
