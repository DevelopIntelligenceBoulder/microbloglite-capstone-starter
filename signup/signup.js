window.onload = function () {

    let registerBtn = document.getElementById("registerBtn")
    registerBtn.onclick = registerBtnClick;
}

function registerBtnClick() {
    document.getElementById("noFirstName").innerHTML = " "
    document.getElementById("noLastName").innerHTML = " "
    document.getElementById("noUserName").innerHTML = " "
    document.getElementById("noPassword").innerHTML = " "
    document.getElementById("noPasswordMatch").innerHTML = " "
    document.getElementById("notChecked").innerHTML = " "


    if (document.getElementById("firstNameInput").value.length === 0) {
        document.getElementById("noFirstName").innerHTML = "Please enter your first name"
    }

    if (document.getElementById("lastNameInput").value.length === 0) {
        document.getElementById("noLastName").innerHTML = "Please enter your last name"
    }

    if (document.getElementById("userNameInput").value.length === 0) {
        document.getElementById("noUserName").innerHTML = "Please enter a Username"
    }

    if (document.getElementById("passwordInput").value.length === 0) {
        document.getElementById("noPassword").innerHTML = "Please enter a password"
    }

    if (document.getElementById("passwordInput").value != document.getElementById("confirmPasswordInput").value) {
        document.getElementById("noPasswordMatch").innerHTML = "Password does not match, try it again"
    }

    if (document.getElementById("checkBox").checked == false) {
        document.getElementById("notChecked").innerHTML = "Please agree to the Term Of Services"
    }

    if (document.getElementById("firstNameInput").value.length > 0 && document.getElementById("lastNameInput").value.length > 0 &&
        document.getElementById("userNameInput").value.length > 0 && document.getElementById("passwordInput").value.length > 0 && document.getElementById("passwordInput").value === document.getElementById("confirmPasswordInput").value &&
        document.getElementById("checkBox").checked == true) {

        let getData = {

            username: document.getElementById("userNameInput").value,
            fullName: document.getElementById("firstNameInput").value + " " + document.getElementById("lastNameInput").value,
            password: document.getElementById("passwordInput").value

        }

        fetch("https://microbloglite.herokuapp.com/api/users",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(getData)
            })
            .then(response => response.json())
            .then(json => {
                setTimeout(
                    function () {
                        window.location.assign("/landing/index.html");
                    }, 5000);
                document.getElementById("accountCreated").innerHTML = "User created successfully, Redirecting to Log In page"

            });
    }
}
