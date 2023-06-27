function getuser() {
  const loginData = JSON.parse(window.localStorage.getItem("login-data"));
  fetch(apiBaseURL + `api/users/${loginData.username}`)
    .then((response) => response.json())
    .then((user) => {
      ///does stuff
    });
}
