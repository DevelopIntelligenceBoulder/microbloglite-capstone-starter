const postBtnEl = document.getElementById(`postBtn`);
const createPostInputEl = document.getElementById(`createPostInput`);
const logoutBtn = document.getElementById("logoutBtn");
const displayPostsDivEl = document.getElementById(`DisplayPostsDivs`);
const postDisplayEl = document.getElementById(`postDisplay`);
const userAccount = document.getElementById('userAccount');
const userInfo = document.getElementById('userInfo');

const loginData = getLoginData();

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

      userAccount.innerHTML = loginData.username

      userInfo.innerHTML = `${loginData.username}'s Profile`

      let template;
      
      template = document.getElementById("postDisplay");

      data.forEach((post) => {

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

        if ("content" in document.createElement("template")) {
          const postEl = template.content.cloneNode(true);

          const username = postEl.querySelector("h3");
          username.textContent = post.username;

          const postText = postEl.querySelector("p");
          postText.textContent = post.text;

          const timeStamp = postEl.querySelector("small");
          timeStamp.textContent = post.createdAt;

          const deleteBtnEl = postEl.getElementById(`deleteBtn`);

          deleteBtnEl.addEventListener("click", () => {
            fetch(`https://microbloglite.herokuapp.com/api/posts/${post._id}`, {
              method: `DELETE`,
              headers: {
                Authorization: `Bearer ${loginData.token}`,
              },
            });
          });
          //--------------------------------------------------------------------
          const likeBtn = postEl.querySelector("input");
          likeBtn.addEventListener("click", () => {
            const heartIcon = document.getElementById("heartIcon");
            const filledHeartIcon = document.getElementById("filledHeartIcon");

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
