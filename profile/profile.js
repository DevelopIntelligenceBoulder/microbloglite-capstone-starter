// Main
// window.onload = () => {
//   if (isLoggedIn()) populatePage();
//   else window.location.replace("../");
// };

async function populatePage() {
  document.getElementById("logoutBtn").onclick=logout;

  const localUserData = await getLocalUserData(); //Auth token required to access server
  const pageData = await fetchPageData(localUserData);

  populateBio({ user: pageData.user })
  populatePosts({
    allUserPosts: pageData.allUserPosts,
    user: pageData.user,
    localUserData,
  })
}

function populateBio({ user }) {
  document.getElementById("username").innerHTML = user.username;
  document.getElementById("fullname").innerHTML = user.fullName;
  document.getElementById("about").innerHTML = user.bio;
  document.getElementById("loginName").innerHTML = user.fullName;
}

function populatePosts({ allUserPosts, localUserData, user }) {
  const cardHolder = document.getElementById("cardHolder");
  cardHolder.innerHTML="";

  allUserPosts.forEach((post) => {
    cardHolder.append(
      createCard({
        name: user.fullName,
        username: post.username,
        createdAt: post.createdAt,
        text: post.text,
      })
    );
  });
}

async function fetchPageData({ token, username }) {
  const options = {
    headers: {
      Authorization: `Bearer ${await token}`,
    },
  };
  const query = `?username=${username}&limit=5`;

  const allUsers = await fetchAllUsers({ options });
  const user = await fetchUser({ username, options });
  const allUserPosts = await fetchAllPosts({ query, options });

  return { user, allUsers, allUserPosts };
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
  cardElement.innerHTML = `
    <div class="row ">
      <div class="p-0">
        <div class="card-header">
          <div class="d-flex flex-wrap gap-2">
            <div class="bi bi-person-fill" style="font-size: x-large"></div>
            <div class="">${cardData.name}</div>
            <div class="text-secondary-emphasis flex-grow-1">@${cardData.username}</div>
            <div class="">${cardData.createdAt.split("T")[0]}</div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card-body ">
          <div class="row">
            <div class="col-12">
              ${cardData.text}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  return cardElement;
};
