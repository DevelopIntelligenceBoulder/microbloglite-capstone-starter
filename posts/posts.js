window.onload = () => {
  if (isLoggedIn()) populatePage();
  else window.location.replace("../");
};

function populatePage() {
  populateMenu()

  const loginData = getLocalUserData();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(API_URL + "/api/posts", options)
    .then((response) => response.json())
    .then((posts) => {
      let postsContainer = document.getElementById("posts");
      for (let post of posts) {
        let postElem = createPostElem(post);
        postsContainer.appendChild(postElem);
      }
    });
}

function populateMenu (){
    document.getElementById("logoutBtn").onclick = logout; //init logout btn
    document.getElementById("loginName").innerHTML = getLocalUserData().user
}

let createPostElem = (post) => {
  let div = document.createElement("div");
  div.innerHTML = `<div class="card justify-content-center " style="width:18 rem;">
          <div class="card-body ">
            <h5 class="card-title">${post.username}</h5>
            <p class="card-text" >${post.text}</p>
            <a class="btn text-primary">Love it</a>
            <a class="btn text-danger-emphasis">Fudge it</a>
          </div>
         </div>`;
  return div;
};
