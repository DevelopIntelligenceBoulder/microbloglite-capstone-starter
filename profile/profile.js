function getuser() {
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));
  fetch(apiBaseURL + `api/users/${loginData.username}`)
    .then((response) => response.json())
    .then((user) => {
      ///does stuff
    });
}

 
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));
  const form = document.querySelector(".admin-form");
  const titleInput = document.getElementById("title");
  const bodyInput = document.getElementById("post-editor");
  const topicSelect = document.getElementById("topic");
  const publishedCheckbox = document.getElementById("published");


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const loginData = JSON.parse(window.localStorage.getItem("login-data"));


    const errors = [];
    if (titleInput.value.trim() === "") {
      errors.push("Title is required");
    }
    if (topicSelect.value.trim() === "") {
      errors.push("Topic is required");
    }

    const formErrors = document.querySelector(".form-errors");
    formErrors.innerHTML = "";
    if (errors.length > 0) {
      errors.forEach((error) => {
        const li = document.createElement("li");
        li.textContent = error;
        formErrors.appendChild(li);
      });
      return;
    }

    const post = {
      text: titleInput.value.trim(),
    };
    

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginData.token}`,
      },
      body: JSON.stringify(post),
    };

    fetch(apiBaseURL + "/api/posts", options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Post created successfully:", data);

        titleInput.value = "";
        bodyInput.value = "";
        topicSelect.value = "";
        publishedCheckbox.checked = false;


      })


  });


function displayPosts(posts) {
  console.log("Displaying posts:", posts);
}



const logoutLink = document.getElementById("logout");
logoutLink.addEventListener("click", logout);

