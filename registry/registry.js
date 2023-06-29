// $(function() {
//     $('input').floatlabel({labelEndTop:0});
//   });

console.log("does this script even run???");

function register(registerData) {
  const options = {
    method: "POST",
    headers: {
      // This header specifies the type of content we're sending.
      // This is required for endpoints expecting us to send
      // JSON data.
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  };

  return fetch(apiBaseURL + "/api/users", options)
    .then((response) => response.json())
    .then((registerData) => {
      console.log(registerData);
      window.location.replace("/posts"); // redirect

      return registerData;
    });
}

const registerForm = document.querySelector("#register");

registerForm.addEventListener("submit", function (event) {
  // Prevent the form from refreshing the page,
  // as it will do by default when the Submit event is triggered:
  event.preventDefault();
  console.log("form submitted");

  // We can use registerForm.username (for example) to access
  // the input element in the form which has the ID of "username".
  const registerData = {
    username: document.querySelector("#username").value,
    fullName: document.querySelector("#full-name").value,
    password: document.querySelector("#password").value,
  };

  // Disables the button after the form has been submitted already:
  registerForm.registerButton.disabled = true;

  // Time to actually process the login using the function from auth.js!
  register(registerData);
});
