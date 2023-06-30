const postBtnEl = document.getElementById(`postBtn`);
const createPostInputEl = document.getElementById(`createPostInput`);
const logoutBtn = document.getElementById("logoutBtn");
const displayPostsDivEl = document.getElementById(`DisplayPostsDivs`);
const postDisplayEl = document.getElementById(`postDisplay`);
<<<<<<< Updated upstream
const userAccount = document.getElementById('userAccount');
const userInfo = document.getElementById('userInfo');

=======
const userAccount = document.getElementById("userAccount");
const userInfo = document.getElementById("userInfo");
const usernamePosts = document.getElementById("usernamePosts");
const editBtn = document.getElementById("editBtn");
const userBio = document.getElementById(`userBio`);
>>>>>>> Stashed changes
const loginData = getLoginData();
const bioDiv = document.querySelector(`.bioDiv`);
const doneBtn = document.getElementById(`doneBtn`);
const bioText = document.getElementById(`bioText`);

<<<<<<< Updated upstream
=======
fetch(`https://microbloglite.herokuapp.com/api/users/${loginData.username}`,{
      method: `GET`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${loginData.token}`,
      }
    }).then((response) => response.json()) .then(bio =>{
      userBio.innerHTML = bio.bio
    })

editBtn.addEventListener("click", () => {
  userBio.style.display = `none`;
  editBtn.style.display = `none`;
  bioDiv.style.display = `block`;
  bioText.style.display = `flex`;
  doneBtn.style.display = `flex`;

  doneBtn.addEventListener("click", () => {
    fetch(
      `https://microbloglite.herokuapp.com/api/users/${loginData.username}`,
      {
        method: `PUT`,
        body: JSON.stringify({
          bio: bioText.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${loginData.token}`,
        },
      }
    );
    userBio.style.display = `flex`;
    editBtn.style.display = `flex`;
    bioDiv.style.display = `none`;
    bioText.style.display = `none`;
    doneBtn.style.display = `none`;

    fetch(`https://microbloglite.herokuapp.com/api/users/${loginData.username}`,{
      method: `GET`,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${loginData.token}`,
      }
    }).then((response) => response.json()) .then(bio =>{
      userBio.innerHTML = bio.bio
    })
  });
});

>>>>>>> Stashed changes
//------------------------------------------------------------------
logoutBtn.addEventListener("click", () => {
  logout();
});

window.onload = getPosts;

//------------------------------------------------------------------
postBtnEl.addEventListener(`click`, (e) => {
  //console.log(`click`); works
  //console.log(createPostInputEl.value);
  e.preventDefault();
  const options = {
    method: "POST",
    body: JSON.stringify({
      text: createPostInputEl.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  const url = `https://microbloglite.herokuapp.com/api/posts`;
  fetch(url, options)
    .then((response) => response.json())
    .then((posts) => {
      console.log(posts);
    });
  getPosts();
<<<<<<< Updated upstream
=======
  window.location.assign(`profile.html`);
>>>>>>> Stashed changes
});
//----------------------------------------------------------------------------------

function getPosts() {
  const userNameUrl = `https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0&username=${loginData.username}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };
  fetch(userNameUrl, options)
    .then((response) => response.json())
    .then((data) => {
      userAccount.innerHTML = loginData.username;

      userInfo.innerHTML = `${loginData.username}'s Profile`;

<<<<<<< Updated upstream
      userInfo.innerHTML = `${loginData.username}'s Profile`
=======
      usernamePosts.innerHTML = `${loginData.username}'s Posts`;
>>>>>>> Stashed changes

      let template;

      template = document.getElementById("postDisplay");

      data.forEach((post) => {
<<<<<<< Updated upstream

        // const content = `
        // <div class="border p-3 m-3">
        // <h3><span>@</span>${post.username}</h3>

        // <p>${post.text}</p>

        // <p class="fs-6 lead">${Date(post.createdAt).toLocaleString()}</p>
        // </div>
        // `
        // const createButton = document.createElement('button')
        // createButton.setAttribute('type','button')
        // createButton.classList.add('btn', 'btn-danger')
        // createButton.textContent = 'Like'

        // displayPostsDiv.innerHTML += content;

        // displayPostsDiv.append(createButton);

=======
>>>>>>> Stashed changes
        if ("content" in document.createElement("template")) {
          const postEl = template.content.cloneNode(true);

          const username = postEl.querySelector("h3");
          username.textContent = post.username;

          const postText = postEl.querySelector("p");
          postText.textContent = post.text;

          const timeStamp = postEl.querySelector("small");
<<<<<<< Updated upstream
          timeStamp.textContent = post.createdAt;

          const deleteBtnEl = postEl.getElementById(`deleteBtn`);

          deleteBtnEl.addEventListener("click", () => {
            fetch(`https://microbloglite.herokuapp.com/api/posts/${post._id}`, {
              method: `DELETE`,
              headers: {
                Authorization: `Bearer ${loginData.token}`,
=======
          timeStamp.textContent = new Date(post.createdAt).toLocaleString();

          const trashBtnEl = postEl.getElementById(`trashBtn`);

          const deleteBtnEl = postEl.getElementById("deleteBtn");

          deleteBtnEl.addEventListener("click", () => {
            fetch(`https://microbloglite.herokuapp.com/api/posts/${post._id}`, {
              method: "DELETE",

              headers: {
                Authorization: `Bearer ${loginData.token}`,
                "Content-type": "application/json; charset=utf-8",
>>>>>>> Stashed changes
              },
            });
          });
          //--------------------------------------------------------------------
<<<<<<< Updated upstream
          const likeBtn = postEl.querySelector("input");
          likeBtn.addEventListener("click", () => {
            const heartIcon = document.getElementById("heartIcon");
            const filledHeartIcon = document.getElementById("filledHeartIcon");
=======
          const likeBtn = postEl.querySelector("a");

          likeBtn.addEventListener("click", (e) => {
            e.preventDefault();

            console.log(post._id);
            const heartIcon = likeBtn.querySelector(".heartIcon");
            const filledHeartIcon = likeBtn.querySelector(".filledHeartIcon");
>>>>>>> Stashed changes

            heartIcon.style.display = "none";
            filledHeartIcon.style.display = "flex";

            const options = {
              method: "POST",
              body: JSON.stringify({
                postId: post._id,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: `Bearer ${loginData.token}`,
              },
            };
            fetch(`https://microbloglite.herokuapp.com/api/likes`, options);
          });

          displayPostsDiv.appendChild(postEl);
        }
      });
    });
}
//------------------------------------------------------------------------------------------
