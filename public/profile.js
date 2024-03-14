window.onload = () => {
  if (isLoggedIn()) populatePage();
  else window.location.replace("../");
};

async function populatePage() {
  document.getElementById("logoutBtn").onclick = logout; //init logout btn
  window.deletePost = deletePost; //make this global

  const localUserData = await getLocalUserData(); //Auth token required to access server
  const pageData = await fetchPageData(localUserData);

  populateBio({ user: pageData.user });
  populatePosts({
    allUserPosts: pageData.allUserPosts,
    user: pageData.user,
    localUserData,
  });
}

function populateBio({ user }) {
  document.getElementById("username").innerHTML = user.username;
  document.getElementById("fullname").innerHTML = user.fullName;
  document.getElementById("about").innerHTML = user.bio;
  document.getElementById("loginName").innerHTML = user.fullName;
}

function populatePosts({ allUserPosts, localUserData, user }) {
  const cardHolder = document.getElementById("cardHolder");
  cardHolder.innerHTML = "";

  allUserPosts.forEach((post) => {
    const card = createCard({
      name: user.fullName,
      username: post.username,
      createdAt: post.createdAt,
      text: post.text,
      id: post._id,
    });
    cardHolder.append(card);
  });
}

async function fetchPageData({ token, username }) {
  const options = {
    headers: {
      Authorization: `Bearer ${await token}`,
    },
  };
  const query = `?username=${username}&limit=10`;

  // const allUsers = await fetchAllUsers({ options });
  const user = await fetchUser({ username, options });
  const allUserPosts = await fetchAllPosts({ query, options });

  return { user, allUserPosts };
}

function deletePost(id) {
  const options = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getLocalUserData().token}` },
  };
  document.getElementById(id).remove();
  fetch(API_URL + `/api/posts/${id}`, options).then((res) => {});
}
//  Helper Functions
const fetchUser = ({ username, options }) =>
  fetch(API_URL + `/api/users/${username}`, options).then((res) => res.json());

const fetchAllUsers = ({ options }) =>
  fetch(API_URL + `/api/users/`, options).then((res) => res.json());

const fetchAllPosts = ({ query, options }) =>
  fetch(API_URL + `/api/posts/${query}`, options).then((res) => res.json());

const createArticle = (...classes) => {
  const element = document.createElement("article");
  element.classList.add(...classes);
  return element;
};

// HTML element generation
const createCard = (cardData) => {
  const cardElement = createArticle("card", "container", "shadow");
  cardElement.id = cardData.id;
  cardElement.innerHTML = `
        <div class="row" >
          <div class="col-12 px-0">
            <div class="card-header">
              <div class="d-flex flex-wrap gap-3">
                <div
                  class="bi bi-person-fill"
                  style="font-size: x-large"
                ></div>
                <div class="">${cardData.name}</div>
                <div
                  class="text-secondary-emphasis flex-grow-1"
                >
                  @${cardData.username}
                </div>
                <div class="small">
                  ${cardData.createdAt.split("T")[0]}
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="row">
              <div class="col-12">
                <div class="card-body">
                  <div class="col-12 small">
                    ${cardData.text}
                  </div>
                </div>
              </div>
              <div class="col-12 p-0">
                <div class="card-footer py-1 gap-3">
                  <div class="col-12">
                    <a class="bi bi-heart btn btn-sm"></a>
                    <a class="bi-repeat btn btn-sm"></a>
                    <a class="btn btn-sm bi-share"></a>
                    <a class="bi bi-x-octagon-fill text-danger-emphasis btn btn-sm float-end" onclick = "deletePost('${
                      cardData.id
                    }')">
                      <span class="">Remove</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

  return cardElement;
};
