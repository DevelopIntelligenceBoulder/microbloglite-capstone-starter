// Main
window.onload = () => {
  if (isLoggedIn()) getData();
  else window.location.replace("../");
};

async function getData() {
  const { token, username } = getLocalUserData(); // Load local user Data
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
  fetch(API_URL + `/api/users/${username}`, fetchOptions).then((res) => res.json());

const getAllUsers = ({ fetchOptions }) =>
  fetch(API_URL + `/api/users/`, fetchOptions).then((res) => res.json());
