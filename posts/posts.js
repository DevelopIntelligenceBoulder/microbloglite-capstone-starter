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
// window.onload = getPosts;

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

  //   postBtnEl.src = url("../images/transparent-noah.png");
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
      //   const sort = "createdAt";
      //   const sortedPosts = Array.from(data).sort(function (ab, bc) {
      //     if (sort === "createdAt") {
      //       return new Date(bc[sort]) - new Date(ab[sort]);
      //     }
      //   });

      //   let startOff = (+pageNumber - 1) * 15;
      //   let endOff = startOff + 15;
      //   function offSett(abc, bcd) {
      //     // const sorting = sortedPosts.slice(a, b);
      //     // abc = (pageNumber - 1) * 15;
      //     // bcd = abc + 15;
      //     let offSet2 = +bcd;
      //     return offSet2;
      //   }

      const sort = "createdAt";
      const sortedPosts = Array.from(data).sort(function (ab, bc) {
        if (sort === "createdAt") {
          return new Date(bc[sort]) - new Date(ab[sort]);
        }
      });
      const sorting = sortedPosts.slice(startOff, endOff);

      //   console.log(startOff, endOff);
      //   sortedPosts.slice(startOff, endOff);

      const nextPageNumber = +pageNumber + 1;
      nextPageEl.href = `/posts/index.html?pageNumber=${nextPageNumber}`;
      if (+pageNumber === 1) {
        document.querySelector("#previousPage").disabled = true;
      } else {
        const previousPageNumber = pageNumber - 1;
        previousPageEl.href = `/posts/index.html?pageNumber=${previousPageNumber}`;
      }
      // //   const sort = "createdAt";
      // //   const sortedPosts = Array.from(post).sort(function (a, b) {
      // //     if (sort === "createdAt") {
      // //       return new Date(b[sort]) - new Date(a[sort]);
      // //     }

      // //     // if (sort === "username") {
      // //     //   if (a[sort].toLowerCase() < b[sort].toLowerCase()) {
      // //     //     return -1;
      // //     //   }
      // //     //   if (a[sort].toLowerCase() > b[sort].toLowerCase()) {
      // //     //     return 1;
      // //     //   }
      // //     //   return 0;
      // //     // }
      // //     // if (sort === "likes") {
      // //     //   return b[sort].length - a[sort].length;
      // //     // }
      // //   });
      // //   console.log(sortedPosts);
      // //   for (let i = +offSet; i <= +offSet + postsPerPage; i++) {
      // //     const post = sortedPosts[i];
      // //     return sortedPosts;

      // //     // if (!post) {
      // //     //   offSet -= postsPerPage;
      // //     //   pageNumber--;
      // //     //   break;
      // //     // }
      // //   }

      sorting.forEach((post) => {
        console.log(post);
        //   console.log(sortedPosts);
        // const sort = "createdAt";
        // const sortedPosts = Array.from(post).sort(function (a, b) {
        //   if (sort === "createdAt") {
        //     return new Date(b[sort]) - new Date(a[sort]);
        //   }
        //   // if (sort === "username") {
        //   //   if (a[sort].toLowerCase() < b[sort].toLowerCase()) {
        //   //     return -1;
        //   //   }
        //   //   if (a[sort].toLowerCase() > b[sort].toLowerCase()) {
        //   //     return 1;
        //   //   }
        //   //   return 0;
        //   // }
        //   // if (sort === "likes") {
        //   //   return b[sort].length - a[sort].length;
        //   // }
        // });
        // for (let i = +offSet; i <= +offSet + postsPerPage; i++) {
        //   const post = sortedPosts[i];
        //   if (!post) {
        //     offSet -= postsPerPage;
        //     pageNumber--;
        //     break;
        //   }
        // }
        // console.log(data);
        // const dateP = new Date(data.createdAt);
        // // console.log(dateP);
        // // console.log(dateP);
        // // console.log(dateP.getMonth());
        // // console.log(dateP.getDay());
        // const timeDiff = dateP.getTime();
        // let timeNumber = data.map((times) => {
        //   return { timeDiff };
        // });
        // // console.log(timeNumber);
        // // console.log(dateP.getTime());
        // // Object.keys(timeNumber);
        // // Object.values(timeNumber);
        // // const objectArray = Object.entries(timeNumber);
        // // console.log(objectArray);

        // const sorted = data.sort(function (a, b) {
        //   const aDate = a.timeNumber;
        //   const bDate = b.timeNumber;
        //   if (aDate < bDate) return -1;
        //   else if (aDate > bDate) return 1;
        //   else return 0;
        //   //   return bDate.getTime() - aDate.getTime();
        // });
        //   console.log(post)
        //   sortedPosts.slice(startOff, endOff);
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
        // console.log(templateEl);
        // const likeButton = document.querySelector('input[type="button"]');
        const userLike = post.likes.find(
          (data) => data.username === loginData.username
        );
        // console.log(userLike);
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
        //   });
        // const sort = "createdAt";
        // const sortedPosts = Array.from(data).sort(function (ab, bc) {
        //   if (sort === "createdAt") {
        //     return new Date(bc[sort]) - new Date(ab[sort]);
        //   }
        // });
        // console.log(sortedPosts.slice(startOff, endOff));

        //   console.log(offSett(startOff, endOff));
        //   sortedPosts(offSett())

        // data.sort(function (a, b) {
        //   if (a.createdAt > b.createdAt) return -1;
        //   else if (+a.createdAt == +b.createdAt) return 0;
        //   else return 1;
      });
    });
});

window.addEventListener("load", function getPosts() {
  //   console.log(loginData);
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  //   const urlParamPage = new URLSearchParams(location.search);
  //   let pageNumber = -1;

  //   if (urlParamPage.has("pageNumber") === true) {
  //     pageNumber = urlParamPage.get("pageNumber");
  //   }

  const postsPerPage = 15;
  let offSet = 1000000;
  //   let offSet = 0
  const nextPageEl = document.getElementById("nextPage");
  const previousPageEl = document.getElementById("previousPage");

  //   fetch(`${apiBaseURL}api/posts?limit=1000000&offset=0`, options)
  //     .then((response) => response.json())
  //     .then((allPosts) => {
  //       allPosts.forEach((post) => {
  //         // console.log(allPosts);
  //         const dateP = new Date(post.createdAt);
  //         // console.log(dateP);
  //         // console.log(dateP);
  //         // console.log(dateP.getMonth());
  //         // console.log(dateP.getDay());
  //         const timeDiff = dateP.getTime();
  //         let timeNumber = allPosts.map((times) => {
  //           return { timeDiff };
  //         });
  //         // console.log(timeNumber);
  //         // console.log(dateP.getTime());
  //         // Object.keys(timeNumber);
  //         // Object.values(timeNumber);
  //         // const objectArray = Object.entries(timeNumber);
  //         // console.log(objectArray);

  //         const sorted = allPosts.sort(function(a, b) {
  //           const aDate = a.timeNumber;
  //           const bDate = b.timeNumber;
  //           if (aDate < bDate) return -1;
  //           else if (aDate > bDate) return 1;
  //           else return 0;
  //           //   return bDate.getTime() - aDate.getTime();
  //         });

  //         // const dateAndTime = post.createdAt;
  //         // const dateOfPost =
  //         // console.log(dateAndTime);
  //         // const sorted = dateP.sort((a, b) => {
  //         //   const aDate = new Date(a + " " + a.time);
  //         //   const bDate = new Date(b.date + " " + b.time);

  //         //   return bDate.getTime() - aDate.getTime();
  //         // });
  //         // console.log(sorted);
  //         // const dates = allPosts;
  //         // console.log(dates);
  //       });

  // const sorted = datetimes.sort((a, b) => {
  //   const aDate = new Date(a.date + " " + a.time);
  //   const bDate = new Date(b.date + " " + b.time);

  //   return bDate.getTime() - aDate.getTime();
  // });
  //   console.log(allPosts);
  // });

  fetch(
    `${apiBaseURL}api/posts?limit=${postsPerPage}&offset=${offSet}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      //   const nextPageNumber = +pageNumber + 1;
      //   nextPageEl.href = `/posts/index.html?pageNumber=${nextPageNumber}`;
      //   if (+pageNumber === 1) {
      //     document.querySelector("#previousPage").disabled = true;
      //   } else {
      //     const previousPageNumber = pageNumber - 1;
      //     previousPageEl.href = `/posts/index.html?pageNumber=${previousPageNumber}`;
      //   }
      //   // //   const sort = "createdAt";
      //   // //   const sortedPosts = Array.from(post).sort(function (a, b) {
      //   // //     if (sort === "createdAt") {
      //   // //       return new Date(b[sort]) - new Date(a[sort]);
      //   // //     }
      //   // //     // if (sort === "username") {
      //   // //     //   if (a[sort].toLowerCase() < b[sort].toLowerCase()) {
      //   // //     //     return -1;
      //   // //     //   }
      //   // //     //   if (a[sort].toLowerCase() > b[sort].toLowerCase()) {
      //   // //     //     return 1;
      //   // //     //   }
      //   // //     //   return 0;
      //   // //     // }
      //   // //     // if (sort === "likes") {
      //   // //     //   return b[sort].length - a[sort].length;
      //   // //     // }
      //   // //   });
      //   // //   console.log(sortedPosts);
      //   // //   for (let i = +offSet; i <= +offSet + postsPerPage; i++) {
      //   // //     const post = sortedPosts[i];
      //   // //     return sortedPosts;
      //   // //     // if (!post) {
      //   // //     //   offSet -= postsPerPage;
      //   // //     //   pageNumber--;
      //   // //     //   break;
      //   // //     // }
      //   // //   }
      //   data.forEach((post) => {
      //     //   console.log(sortedPosts);
      //     // const sort = "createdAt";
      //     // const sortedPosts = Array.from(post).sort(function (a, b) {
      //     //   if (sort === "createdAt") {
      //     //     return new Date(b[sort]) - new Date(a[sort]);
      //     //   }
      //     //   // if (sort === "username") {
      //     //   //   if (a[sort].toLowerCase() < b[sort].toLowerCase()) {
      //     //   //     return -1;
      //     //   //   }
      //     //   //   if (a[sort].toLowerCase() > b[sort].toLowerCase()) {
      //     //   //     return 1;
      //     //   //   }
      //     //   //   return 0;
      //     //   // }
      //     //   // if (sort === "likes") {
      //     //   //   return b[sort].length - a[sort].length;
      //     //   // }
      //     // });
      //     // for (let i = +offSet; i <= +offSet + postsPerPage; i++) {
      //     //   const post = sortedPosts[i];
      //     //   if (!post) {
      //     //     offSet -= postsPerPage;
      //     //     pageNumber--;
      //     //     break;
      //     //   }
      //     // }
      //     // console.log(data);
      //     // const dateP = new Date(data.createdAt);
      //     // // console.log(dateP);
      //     // // console.log(dateP);
      //     // // console.log(dateP.getMonth());
      //     // // console.log(dateP.getDay());
      //     // const timeDiff = dateP.getTime();
      //     // let timeNumber = data.map((times) => {
      //     //   return { timeDiff };
      //     // });
      //     // // console.log(timeNumber);
      //     // // console.log(dateP.getTime());
      //     // // Object.keys(timeNumber);
      //     // // Object.values(timeNumber);
      //     // // const objectArray = Object.entries(timeNumber);
      //     // // console.log(objectArray);
      //     // const sorted = data.sort(function (a, b) {
      //     //   const aDate = a.timeNumber;
      //     //   const bDate = b.timeNumber;
      //     //   if (aDate < bDate) return -1;
      //     //   else if (aDate > bDate) return 1;
      //     //   else return 0;
      //     //   //   return bDate.getTime() - aDate.getTime();
      //     // });
      //     // console.log(post);
      //     const templateEl = document.querySelector("#postCards");
      //     var a = document.createElement("a");
      //     a.textContent = post.username;
      //     a.title = post.username;
      //     a.href = `../profile/otherProfile.html?username=${post.username}`;
      //     a.style.textDecoration = "none";
      //     a.style.color = "#5a0303";
      //     document.body.appendChild(a);
      //     const clone = templateEl.content.cloneNode(true);
      //     let title = clone.querySelector(".card-title");
      //     let postInfo = clone.querySelector(".card-text");
      //     let likeBtn = clone.querySelector('button[class="button"]');
      //     likeBtn.textContent = post.likes.length;
      //     title.appendChild(a);
      //     postInfo.textContent = post.text;
      //     const imgEl = document.createElement("img");
      //     likeBtn.value = `${post.likes.length} `;
      //     templateEl.appendChild(clone);
      //     // console.log(templateEl);
      //     // const likeButton = document.querySelector('input[type="button"]');
      //     const userLike = post.likes.find(
      //       (data) => data.username === loginData.username
      //     );
      //     // console.log(userLike);
      //     // console.log(userLike);
      //     // console.log(post);
      //     if (userLike) {
      //       imgEl.src = "../images/likeFlame.png";
      //       imgEl.alt = "Like Flame";
      //       likeBtn.appendChild(imgEl);
      //       likeBtn.addEventListener("click", (e) => {
      //         e.preventDefault();
      //         const options = {
      //           method: "DELETE",
      //           headers: {
      //             "Content-type": "application/json; charset=utf-8",
      //             Authorization: `Bearer ${loginData.token}`,
      //           },
      //         };
      //         const url = `${apiBaseURL}api/likes/${userLike._id}`;
      //         fetch(url, options)
      //           .then((response) => response.json())
      //           .then((data) => {
      //             window.location.assign(
      //               `/posts/index.html?pageNumber=${pageNumber}`
      //             );
      //           });
      //       });
      //     } else {
      //       imgEl.src = "../images/dislikeFlame.png";
      //       imgEl.alt = "Dislike Flame";
      //       likeBtn.appendChild(imgEl);
      //       likeBtn.addEventListener("click", (e) => {
      //         e.preventDefault();
      //         let bodyData = {
      //           postId: post._id,
      //         };
      //         const options = {
      //           method: "POST",
      //           body: JSON.stringify(bodyData),
      //           headers: {
      //             "Content-type": "application/json; charset=UTF-8",
      //             Authorization: `Bearer ${loginData.token}`,
      //           },
      //         };
      //         const url = `${apiBaseURL}api/likes`;
      //         fetch(url, options)
      //           .then((response) => response.json())
      //           .then((data) => {
      //             window.location.assign(
      //               `/posts/index.html?pageNumber=${pageNumber}`
      //             );
      //           });
      //       });
      //     }
      //   });
    });
  //   fetch(`${apiBaseURL}api/posts?limit=15&offset=0`, options)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //   console.log(data);
  //       data.forEach((post) => {
  //         // console.log(post);
  //         const templateEl = document.querySelector("#postCards");
  //         // const title = document.querySelector(".card-title");
  //         // const postInfo = document.querySelector(".card-text");
  //         // const likeBtn = document.querySelector(type[button]);

  //         // Clone the new row and insert it into the table
  //         // const hrefEl = document.querySelector("#hrefUser");
  //         // let anchor = "../profile/otherProfile/";

  //         // Create anchor element.
  //         var a = document.createElement("a");
  //         a.textContent = post.username;

  //         a.title = post.username;

  //         a.href = `../profile/otherProfile.html?username=${post.username}`;

  //         a.style.textDecoration = "none";

  //         document.body.appendChild(a);

  //         const clone = templateEl.content.cloneNode(true);
  //         let title = clone.querySelector(".card-title");
  //         let postInfo = clone.querySelector(".card-text");
  //         let likeBtn = clone.querySelector('button[class="button"]');
  //         likeBtn.textContent = post.likes.length;
  //         title.appendChild(a);
  //         postInfo.textContent = post.text;

  //         const imgEl = document.createElement("img");

  //         likeBtn.value = `${post.likes.length} `;
  //         templateEl.appendChild(clone);

  //         // const likeButton = document.querySelector('input[type="button"]');
  //         const userLike = post.likes.find(
  //           (data) => data.username === loginData.username
  //         );
  //         console.log(userLike);
  //         // console.log(userLike);
  //         // console.log(post);
  //         if (userLike) {
  //           imgEl.src = "../images/likeFlame.png";
  //           imgEl.alt = "Like Flame";
  //           likeBtn.appendChild(imgEl);

  //           likeBtn.addEventListener("click", (e) => {
  //             e.preventDefault();
  //             const options = {
  //               method: "DELETE",
  //               headers: {
  //                 "Content-type": "application/json; charset=utf-8",
  //                 Authorization: `Bearer ${loginData.token}`,
  //               },
  //             };

  //             const url = `${apiBaseURL}api/likes/${userLike._id}`;
  //             fetch(url, options)
  //               .then((response) => response.json())
  //               .then((data) => {
  //                 window.location.assign("/posts");
  //               });
  //           });
  //         } else {
  //           imgEl.src = "../images/dislikeFlame.png";
  //           imgEl.alt = "Dislike Flame";
  //           likeBtn.appendChild(imgEl);
  //           likeBtn.addEventListener("click", (e) => {
  //             e.preventDefault();
  //             let bodyData = {
  //               postId: post._id,
  //             };
  //             const options = {
  //               method: "POST",
  //               body: JSON.stringify(bodyData),
  //               headers: {
  //                 "Content-type": "application/json; charset=UTF-8",
  //                 Authorization: `Bearer ${loginData.token}`,
  //               },
  //             };
  //             const url = `${apiBaseURL}api/likes`;
  //             fetch(url, options)
  //               .then((response) => response.json())
  //               .then((data) => {
  //                 window.location.assign("/posts");
  //               });
  //           });
  //         }
  //       });
  //     });
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
      window.location.assign(`/posts/index.html?pageNumber=${pageNumber}`);
    });
});

// function reload(){
//     // var container = document.getElementById("yourDiv");
//     var content = container.innerHTML;
//     container.innerHTML= content;

//    //this line is to watch the result in console , you can remove it later
//     console.log("Refreshed");
// }

// window.addEventListener("load", function morePosts() {
// //   const options = {
// //     method: "GET",
// //     headers: {
// //       Authorization: `Bearer ${loginData.token}`,
// //     },
// //   };

// //   const urlParamPage = new URLSearchParams(location.search);
// //   let pageNumber = -1;

// //   if (urlParams.has("pageNumber") === true) {
// //     pageNumber = urlParams.get("pageNumber");
// //   }

// //   const postsPerPage = 15;
// //   const offSet = (pageNumber - 1) * 15;
// //   const nextPageEl = document.getElementById("nextPage");
// //   const previousPageEl = document.getElementById("previousPage");

// //   fetch(
// //     `${apiBaseURL}api/posts?limit=${postsPerPage}&offset=${offSet}`,
// //     options
// //   )
// //     .then((response) => response.json())
// //     .then((data) => {
// //       const nextPageNumber = pageNumber + 1;
// //       nextPageEl.href = url(`/posts/index.html?pageNumber=${nextPageNumber}`);
// //       if (pageNumber === 1) {
// //         previousPageEl.style("Disabled");
// //       } else {
// //         const previousPageNumber = pageNumber - 1;
// //         previousPageEl.href = url(
// //           `/posts/index.html?pageNumber=${previousPageNumber}`
// //         );
// //       }
// //       //   const pagesBottomeEl = document.getElementById("pagesBottom");
// //       //   var a = document.createElement("a");
// //       //   a.textContent = data.length / 15;
// //       //   a.title = data.length / 15;
// //       //   //   a.href = `../profile/otherProfile.html?username=${post.username}`;
// //       //   document.body.appendChild(a);
// //       //   const clone = pagesBottomeEl.content.cloneNode(true);
// //       //   let pageNumber = clone.querySelector("li");
// //       //   // let title = clone.querySelector(".card-title");
// //       //   // let postInfo = clone.querySelector(".card-text");
// //       //   // let likeBtn = clone.querySelector('button[class="button"]');
// //       //   //   likeBtn.textContent = post.likes.length;
// //       //   //   title.appendChild(a);
// //       //   pageNumber.appendChild(a);
// //       //   //   postInfo.textContent = post.text;
// //       //   //   const imgEl = document.createElement("img");
// //       //   //   likeBtn.value = `${post.likes.length} `;
// //       //   pagesBottomeEl.appendChild(clone);
// //     });
// // });

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
