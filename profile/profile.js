const postBtnEl = document.getElementById(`postBtn`);
const createPostInputEl = document.getElementById(`createPostInput`);
//------------------------------------------------------------------

postBtnEl.addEventListener(`click`, () => {
  //console.log(`click`); works
  console.log(createPostInputEl.value);

  const options = {
    method: "POST",
    body: JSON.stringify({
      text: createPostInputEl.value,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  const url = "microbloglite.herokuapp.com/api/posts";
  fetch(url, options)
    .then((response) => response.json())
    .then((posts) => {
      let message = posts.text;
    });
});
