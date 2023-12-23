const API_URL = "http://microbloglite.us-east-2.elasticbeanstalk.com/api/";

// Main
window.onload = () => {
  if (isLoggedIn()) getData();
  else window.location.replace("../");
};

async function getData() {
  const { token, username } = getLoginData(); // Load local user Data
  const fetchOptions = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${await token}`,
    },
  };
  const allUsers = await getAllUsers({ fetchOptions });
  const user = await getUser({ username, fetchOptions });

  console.log(user, allUsers);
}

//  Helper Functions
const getUser = ({ username, fetchOptions }) =>
  fetch(API_URL + `users/${username}`, fetchOptions).then((res) => res.json());

const getAllUsers = ({ fetchOptions }) =>
  fetch(API_URL + `users/`, fetchOptions).then((res) => res.json());

//const token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlciIsImlhdCI6MTcwMzI3MTIyNSwiZXhwIjoxNzAzMzU3NjI1fQ.HaGtg5jQeAn9hNqq8tQi0mXivLl-9w1U5YaaKA-YQqg
