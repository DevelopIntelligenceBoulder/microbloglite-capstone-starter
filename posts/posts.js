/* Posts Page JavaScript */

"use strict";

// const apiBaseURL = "https://microbloglite.herokuapp.com";

const textboxEl = document.getElementById("textbox");
const postBtnEl = document.getElementById("postBtn");
const postsMadeUlEl = document.getElementById("postsMadeUl");
const logoutBtnEl = document.getElementById("logoutBtn");

const postCardsDivEl = document.getElementById("postCards");

logoutBtnEl.onclick = logout;
const loginData = getLoginData();

const nextPageEl = document.getElementById("nextPage");
const previousPageEl = document.getElementById("previousPage");

const urlParamPage = new URLSearchParams(location.search);
let pageNumber = -1;

if (urlParamPage.has("pageNumber") === true) {
  pageNumber = urlParamPage.get("pageNumber");
}

window.addEventListener("load", function noahBtn() {
  const noahImg = document.createElement("img");
  noahImg.src = "../images/noah.png";
  noahImg.alt = "Noah Post";
  postBtnEl.appendChild(noahImg);
});

window.addEventListener("load", function sortPost() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-type": "application/json; charset=utf-8",
    },
  };

  let startOff = (+pageNumber - 1) * 15;
  let endOff = startOff + 15;

  fetch(
    `https://microbloglite.herokuapp.com/api/posts?limit=100000&offset=${startOff}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      const sort = "createdAt";
      const sortedPosts = Array.from(data).sort(function (ab, bc) {
        if (sort === "createdAt") {
          return new Date(bc[sort]) - new Date(ab[sort]);
        }
      });
      const sorting = sortedPosts.slice(startOff, endOff);

      const nextPageNumber = +pageNumber + 1;
      nextPageEl.href = `/posts/index.html?pageNumber=${nextPageNumber}`;
      if (+pageNumber === 1) {
        document.querySelector("#previousPage").style.visibility = "hidden";
      } else {
        const previousPageNumber = pageNumber - 1;
        previousPageEl.href = `/posts/index.html?pageNumber=${previousPageNumber}`;
      }

      sorting.forEach((post) => {
        const templateEl = document.querySelector("#postCards");
        var a = document.createElement("a");
        a.textContent = post.username;

        a.title = post.username;

        a.href = `../profile/otherProfile.html?username=${post.username}`;

        a.style.textDecoration = "none";
        a.style.color = "#5a0303";

        document.body.appendChild(a);

        const clone = templateEl.content.cloneNode(true);
        let title = clone.querySelector(".card-title");
        let postInfo = clone.querySelector(".card-text");
        let likeBtn = clone.querySelector('button[class="button"]');
        likeBtn.textContent = post.likes.length;
        title.appendChild(a);
        postInfo.textContent = post.text;

        const imgEl = document.createElement("img");

        likeBtn.value = `${post.likes.length} `;
        templateEl.appendChild(clone);
        const userLike = post.likes.find(
          (data) => data.username === loginData.username
        );

        if (userLike) {
          imgEl.src = "../images/likeFlame.png";
          imgEl.alt = "Like Flame";
          likeBtn.appendChild(imgEl);

          likeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const options = {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=utf-8",
                Authorization: `Bearer ${loginData.token}`,
              },
            };

            const url = `${apiBaseURL}api/likes/${userLike._id}`;
            fetch(url, options)
              .then((response) => response.json())
              .then((data) => {
                window.location.assign(
                  `/posts/index.html?pageNumber=${pageNumber}`
                );
              });
          });
        } else {
          imgEl.src = "../images/dislikeFlame.png";
          imgEl.alt = "Dislike Flame";
          likeBtn.appendChild(imgEl);
          likeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let bodyData = {
              postId: post._id,
            };
            const options = {
              method: "POST",
              body: JSON.stringify(bodyData),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${loginData.token}`,
              },
            };
            const url = `${apiBaseURL}api/likes`;
            fetch(url, options)
              .then((response) => response.json())
              .then((data) => {
                window.location.assign(
                  `/posts/index.html?pageNumber=${pageNumber}`
                );
              });
          });
        }
      });
    });
});

postBtnEl.addEventListener("click", () => {
  let bodyData = {
    text: textboxEl.value,
    username: loginData.username,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  const url = `${apiBaseURL}api/posts`;
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      window.location.assign(`/posts/index.html?pageNumber=1`);
    });
});
