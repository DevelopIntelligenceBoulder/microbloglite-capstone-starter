"use strict";

window.onload = () => {
  // Nav Variables
  let userIcon = document.getElementById("userIcon");
  let dropdownContent = document.getElementById("dropdownContent");
  let logOutBtnEl = document.getElementById("logOutBtn");

  // Picture Variables

  // Function to toggle dropdown visibility
  function toggleDropdown() {
    dropdownContent.classList.toggle("show");
  }

  // Redirect to Landing Page
  logOutBtnEl.addEventListener("click", logout);

  // Event listener to toggle dropdown when clicking on the user icon
  userIcon.addEventListener("click", toggleDropdown);

  // Close the dropdown if clicking outside of it
  window.addEventListener("click", function (event) {
    if (!event.target.closest(".nav-user-dropdown")) {
      dropdownContent.classList.remove("show");
    }
  });

  // Picture Logic

  function showSelectedPic(file, profilePicPreview) {
    if (file) {
      let reader = new FileReader();

      reader.addEventListener("load", function () {
        profilePicPreview.src = reader.result;

        localStorage.setItem("profilePicSave", reader.result);
      });

      reader.readAsDataURL(file);
    }
  }

  window.addEventListener("load", function () {
    let storedImg = localStorage.getItem("profilePicSave");
    if (storedImg) {
      let profilePicPreview = document.getElementById("profilePicPreview");
      let userImgEl = document.getElementById("userImg");
      let postImgEl = document.getElementById("postImg");
      profilePicPreview.src = storedImg;
      userImgEl.src = storedImg;
      postImgEl.src = storedImg;
    }
  });

  let profilePicEl = document.getElementById("profilePic");
  let changeBtnEl = document.getElementById("changeBtn");

  profilePicEl.addEventListener("change", function () {
    let file = this.files[0];
    let profilePicPreview = document.getElementById("profilePicPreview");
    let userImgEl = document.getElementById("userImg");
    let postImgEl = document.getElementById("postImg");
    showSelectedPic(file, profilePicPreview);
    showSelectedPic(file, userImgEl);
    showSelectedPic(file, postImgEl);
  });

  changeBtnEl.addEventListener("click", function () {
    profilePicEl.click();
  });

  // Get All Posts
  function getAllPosts() {
    // GET /api/users
    const loginData = getLoginData();
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    };
    fetch(
      "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",
      options
    )
      .then((response) => response.json())
      .then((posts) => {
        let profilePostsEl = document.getElementById("profile-posts");
        // Do something with the users array...
        posts.forEach((post) => {
          let postEl = document.createElement("div");
          postEl.classList.add("card");

          let usernameEl = document.createElement("div");
          usernameEl.classList.add("username");
          usernameEl.textContent = `${post.username}`;

          let postTextEl = document.createElement("div");
          postTextEl.classList.add("post-text");
          postTextEl.textContent = post.text;

          postEl.appendChild(usernameEl);
          postEl.appendChild(postTextEl);

          profilePostsEl.appendChild(postEl);
        });
        console.log(posts);
      });
  }
  getAllPosts();
};
