function ProfileFilter() {
  let element = document.getElementById("displayPostHere");

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

  fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=100&offset=0&username=" + usernameEndPoint,
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
      for (let i = 0; i < result.length; i++) {
        let userPostInfo = `
        <div class="card">
          <div class="card-header">
            ${result[i]._id} @${result[i].username} <br> ${result[i].createdAt}
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