function CreateUser() {

    
let myHeaders = new Headers();
myHeaders.append("accept", "application/json");
myHeaders.append("Content-Type", "application/json");

let raw = JSON.stringify({
  username: "michael5",
  fullName: "michaelmartinez4",
  password: "mike",
});

let requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};
alert('Creating the user');
fetch("https://microbloglite.herokuapp.com/api/users", requestOptions)
  .then((response) => response.text())
  .then((data) => alert(data))
  .catch((error) => console.log("error", error));
}

   // window.localStorage.setItem();
