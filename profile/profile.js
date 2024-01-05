"use strict";

function showSelectedPic(url, profilePicPreview) {
  if (url) {
    profilePicPreview.src = url;
    localStorage.setItem("profilePicURL", url);
  }
}

window.addEventListener("load", function () {
  let storedImgURL = localStorage.getItem("profilePicURL");
  if (storedImgURL) {
    let profilePicPreview = document.getElementById("profilePicPreview");
    let userImgEl = document.getElementById("userImg");
    let postImgEl = document.getElementById("postImg");
    profilePicPreview.src = storedImgURL;
    userImgEl.src = storedImgURL;
    postImgEl.src = storedImgURL;
  }
});

let profilePicEl = document.getElementById("profilePic");
let changeBtnEl = document.getElementById("changeBtn");

profilePicEl.addEventListener("change", function () {
  let file = this.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    let imageUrl = e.target.result;
    let profilePicPreview = document.getElementById("profilePicPreview");
    let userImgEl = document.getElementById("userImg");
    let postImgEl = document.getElementById("postImg");

    showSelectedPic(imageUrl, profilePicPreview);
    showSelectedPic(imageUrl, userImgEl);
    showSelectedPic(imageUrl, postImgEl);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

changeBtnEl.addEventListener("click", function () {
  profilePicEl.click();
});

window.onload = () => {
  // Nav Variables
  let userIcon = document.getElementById("userIcon");
  let dropdownContent = document.getElementById("dropdownContent");
  let logOutBtnEl = document.getElementById("logOutBtn");
  let postBtnEl = document.getElementById("postBtn");
  let textAreaEl = document.getElementById("textArea");

  // Function to toggle dropdown visibility
  function toggleDropdown() {
    dropdownContent.classList.toggle("show");
  }

  logOutBtnEl.addEventListener("click", logout);

  userIcon.addEventListener("click", toggleDropdown);

  window.addEventListener("click", function (event) {
    if (!event.target.closest(".nav-user-dropdown")) {
      dropdownContent.classList.remove("show");
    }
  });

  // Post Box

  // Event Listener to Post
  postBtnEl.addEventListener("click", (e) => {
    e.preventDefault();

    // Post Data
    let postData = {
      text: textAreaEl.value,
    };

    // Fetch Posts

    const loginData = getLoginData();

    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((newPost) => {
        let postsContainerEl = document.getElementById("box");
        let newPostDiv = document.createElement("div");
        newPostDiv.classList.add("card");
        newPostDiv.textContent = newPost.message;

        postsContainerEl.appendChild(newPostDiv);

        textAreaEl.value = "";
      })
      .catch((err) => {
        console.error("Error", err);
      });
  });

  // Get All Posts
  function getAllPosts() {
    const loginData = getLoginData();
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    };
    fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0&username=Terence",
      options
    )
      .then((response) => response.json())
      .then((posts) => {
        let profilePostsEl = document.getElementById("profile-posts");
        // Do something with the users array...
        posts.forEach((post) => {
          let postEl = document.createElement("div");
          postEl.classList.add("card");

          // Like Button
          let likeBtn = document.createElement("button");
          likeBtn.innerHTML = "Like &#x2665;";
          likeBtn.classList.add("iconBtn", "likeBtn");

          // Unlike Button
          let unlikeBtn = document.createElement("button");
          unlikeBtn.innerHTML = "Unlike &#x2661;";
          unlikeBtn.classList.add("iconBtn", "unlikeBtn");

          // Function to handle like button
          function handleLikeClick() {
            likeBtn.classList.toggle("active");
            unlikeBtn.classList.remove("active");
          }

          // Function to handle unlike button
          function handleUnlikeClick() {
            unlikeBtn.classList.toggle("active");

            likeBtn.classList.remove("active");
          }

          likeBtn.addEventListener("click", handleLikeClick);
          unlikeBtn.addEventListener("click", handleUnlikeClick);

          let usernameEl = document.createElement("div");
          usernameEl.classList.add("username");
          usernameEl.textContent = `${post.username}`;

          let postTextEl = document.createElement("div");
          postTextEl.classList.add("post-text");
          postTextEl.innerHTML = post.text;

          postEl.appendChild(usernameEl);
          postEl.appendChild(postTextEl);
          postEl.appendChild(likeBtn);
          postEl.appendChild(unlikeBtn);

          profilePostsEl.appendChild(postEl);
          document.body.appendChild(postEl);
        });
        console.log(posts);
      });
  }

  getAllPosts();
  setInterval(getAllPosts, 8000);
};
