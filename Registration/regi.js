const $q = (select) => document.querySelector(select);



const fullName = $q("#fullname");
const userName = $q("#username");
const password = $q("#password");
const rForm = $q("#registration");

function newUser(event) {
    event.preventDefault();

    const bodyData = {
        username: userName.value,
        fullName: fullName.value,
        password: password.value
    }

    fetch("https://microbloglite.herokuapp.com/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData)
    }).then((response) => response.json)
        .then((user) => {
            console.log(user);
            window.location.href = "../index.html";
            localeStorage.message = `${userName.value}`
        })
        .catch((err) => {
            console.log(err);

        })

}




window.onload = () => {
    rForm.onsubmit = newUser;

}