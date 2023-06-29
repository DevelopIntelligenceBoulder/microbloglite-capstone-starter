function displayUserName() {
  const loginData = getLoginData();
  const welcomeMessage = document.querySelector("#welcomeMessage");
  welcomeMessage.textContent = `Welcome, ${loginData.username}`;
}

displayUserName();

function createPost(content) {
  const loginData = getLoginData();

  const post = {
    text: content,
  };

  fetch(apiBaseURL + "/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then((data) => displayPost(data));
}

const statusUpdate = document.querySelector("#statusUpdate");
statusUpdate.onsubmit = function (event) {
  event.preventDefault();
  createPost(statusUpdate.statusText.value);
  statusUpdate.statusText.value = "";
};
