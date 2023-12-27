const API_URL = "https://microbloglite.cyclic.app/api/";

// Main
window.onload = () => {
  if (isLoggedIn()) getData();
  else window.location.replace("../");
};

async function getData() {
  const { token, username } = getLoginData(); // Load local user Data
  const fetchOptions = {
    headers: {
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
