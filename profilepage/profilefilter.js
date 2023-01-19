// function authorizes that user is logged in and captures when they create a post
function CreatePost() {
  let myHeaders = new Headers();
  // token authorization
  let loginData = getLoginData();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + loginData.token);

  let raw = JSON.stringify({
    text: document.getElementById("capturePost").value,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://microbloglite.herokuapp.com/api/posts", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}


function ProfileFilter() {
  let element = document.getElementById("displayProfilePostHere");

  let myHeaders = new Headers();

  let loginData = getLoginData();

  let usernameEndPoint = loginData.username;
  
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + loginData.token);

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  // The fetch post only finds the posts from the username that is logged in. This is the filter
  fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=500&offset=0&username=" + usernameEndPoint,
    requestOptions
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      // let filteredPosts = result.filter((post) => post.username === "usernameEndPoint");
      // sorting the time of the results
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      //for loop to loop through all the posts
      for (let i = 0; i < result.length; i++) {
        let userPostInfo = `
        <div class="card">
          <div class="card-header">
            ${result[i]._id} @${result[i].username}<br> ${result[i].createdAt}
          </div>
          <div class="card-body">
            ${result[i].text}
          </div>
        </div>`;
        element.innerHTML += userPostInfo;
      }
    })
    .catch((error) => console.log(error));
}

ProfileFilter();