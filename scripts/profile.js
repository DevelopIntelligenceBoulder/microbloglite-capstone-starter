const $q = (s) => document.querySelector(s);
const textField = $q("#textField");
const postBtn = $q("#postBtn");
const form = $q("form");
function getLoginData() {
  return JSON.parse(window.localStorage.getItem("login-data")) || {};
}

function createPost(event) {
  event.preventDefault();
  const bodyData = {
    text: textField.value,
  };
  const loginData = getLoginData();

  fetch("https://microbloglite.herokuapp.com/api/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loginData.token}`,
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

window.onload = () => {
  form.onsubmit = createPost;
};
