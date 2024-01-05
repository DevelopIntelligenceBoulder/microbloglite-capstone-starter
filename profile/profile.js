"user strict"

window.onload = function (_event) {
  document.getElementById('media-form').addEventListener('submit', function (event) {
    event.preventDefault();
    newPostItem()
  })

  document.getElementById('logoutBtn').addEventListener('click', function () {
    logoutAndRedirect()
  })
}

// replace method - replace the current document with a new one. new URL
// if (!isLoggedIn()) {
//   window.location.replace("./index.html")
// }


function logoutAndRedirect() {
  logout()
  // window.location.replace("./index.html")
  window.location.replace("/profile")

}

function newPostItem() {
  const newPostTitle = document.getElementById("titleHm").value
  const newPostBody = document.getElementById("description").value
  const newPostText = `Title: "${newPostTitle}" | Description: "${newPostBody}"`.trim()

  // Authentication Token  
  const loginData = getLoginData()

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${loginData.token}`,
      "Content-Type": "application/json",
    },
    // specifies the request body
    body: JSON.stringify({ text: newPostText }),
  }

  fetch(apiBaseURL + "/api/posts", options)
    .then(response => response.json())
    .then(post => {
      console.log(post.text)
      // If the POST finishes successfully, display a message
      let confirmationMessage =
        document.getElementById("newPost");
      confirmationMessage.innerHTML = "New Post Item Added";
    });

}
