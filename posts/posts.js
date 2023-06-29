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
window.onload = getPosts;

function renderPosts() {}

window.addEventListener("load", function noahBtn() {
  const noahImg = document.createElement("img");
  noahImg.src = "../images/noah.png";
  noahImg.alt = "Noah Post";
  postBtnEl.appendChild(noahImg);

  //   postBtnEl.src = url("../images/transparent-noah.png");
});

function getPosts() {
  //   console.log(loginData);
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(`${apiBaseURL}api/posts?limit=15&offset=0`, options)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      data.forEach((post) => {
        // console.log(post);
        const templateEl = document.querySelector("#postCards");
        // const title = document.querySelector(".card-title");
        // const postInfo = document.querySelector(".card-text");
        // const likeBtn = document.querySelector(type[button]);

        // Clone the new row and insert it into the table
        // const hrefEl = document.querySelector("#hrefUser");
        // let anchor = "../profile/otherProfile/";

        // Create anchor element.
        var a = document.createElement("a");
        a.textContent = post.username;

        a.title = post.username;

        a.href = `../profile/otherProfile.html?username=${post.username}`;

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

        // const likeButton = document.querySelector('input[type="button"]');
        const userLike = post.likes.find(
          (data) => data.username === loginData.username
        );
        console.log(userLike);
        // console.log(userLike);
        // console.log(post);
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
                window.location.assign("/posts");
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
                window.location.assign("/posts");
              });
          });
        }
      });
    });
}

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
      window.location.assign("/posts");
    });
});

// function reload(){
//     // var container = document.getElementById("yourDiv");
//     var content = container.innerHTML;
//     container.innerHTML= content;

//    //this line is to watch the result in console , you can remove it later
//     console.log("Refreshed");
// }

window.addEventListener("load", function morePosts() {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(`${apiBaseURL}api/posts?limit=15&offset=0`, options)
    .then((response) => response.json())
    .then((data) => {
      //   const pagesBottomeEl = document.getElementById("pagesBottom");
      //   var a = document.createElement("a");
      //   a.textContent = data.length / 15;
      //   a.title = data.length / 15;
      //   //   a.href = `../profile/otherProfile.html?username=${post.username}`;
      //   document.body.appendChild(a);
      //   const clone = pagesBottomeEl.content.cloneNode(true);
      //   let pageNumber = clone.querySelector("li");
      //   // let title = clone.querySelector(".card-title");
      //   // let postInfo = clone.querySelector(".card-text");
      //   // let likeBtn = clone.querySelector('button[class="button"]');
      //   //   likeBtn.textContent = post.likes.length;
      //   //   title.appendChild(a);
      //   pageNumber.appendChild(a);
      //   //   postInfo.textContent = post.text;
      //   //   const imgEl = document.createElement("img");
      //   //   likeBtn.value = `${post.likes.length} `;
      //   pagesBottomeEl.appendChild(clone);
    });
});

// const likeBtnEl = document.getElementById("likeBtn");
// const cardId = document.getElementsByClassName("card-title");

// likeBtnEl.addEventListener("click", () => {
//   let bodyData = {
//     postId: cardId.value,
//   };
//   const options = {
//     method: "POST",
//     body: JSON.stringify(bodyData),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${loginData.token}`,
//     },
//   };
//   const url = "https://microbloglite.herokuapp.com/api/likes";
//   fetch(url, options)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       window.location.assign("/posts");
//     });
// });

// fetch(`http://localhost:8081/api/courses`)
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((course) => {
//       deleteBtnEl.addEventListener("click", () => {
//         const options = {
//           method: "DELETE",
//           headers: {
//             "Content-type": "application/json; charset=utf-8",
//             Authorization: `Bearer ${loginData.token}`,
//           },
//         };
//         const url = `http://localhost:8081/api/courses/${course.id}`;
//         fetch(url, options)
//           .then((response) => response.json())
//           .then((data) => {
//             alert(`Deleted ${courseNameEl.value}`);
//             window.location.href = "./posts";
//           });
//       });
//     });
//   });
