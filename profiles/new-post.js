const form = document.querySelector("form");
const postArea = document.getElementById("newContent");

const url = `https://microbloglite.herokuapp.com/api/posts`;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bodyData = {
    text: postArea.value,
  };

  async function makeNewPost() {
    const authData = getLoginData();
    const options = {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authData.token}`,
      },
    };
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  }

  if (isLoggedIn()) {
    makeNewPost();
  }
});
