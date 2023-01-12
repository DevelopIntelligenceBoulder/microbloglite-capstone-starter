function ProfileFilter() {
  let element = document.getElementById("displayPostHere");

  let myHeaders = new Headers();

  let loginData = getLoginData();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + loginData.token);

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://microbloglite.herokuapp.com/api/posts?limit=2000&offset=0",
    requestOptions
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      let filteredPosts = result.filter(
        (post) => post.username === loginData.username
      );
      for (let i = 0; i < filteredPosts.length; i++) {
        let userPostInfo = `${filteredPosts[i].username} <br> ${filteredPosts[i].createdAt} <br> ${filteredPosts[i].text} <br>`;
        element.innerHTML += userPostInfo + "<br>";
      }
    })
    .catch((error) => console.log(error));
}
ProfileFilter();
