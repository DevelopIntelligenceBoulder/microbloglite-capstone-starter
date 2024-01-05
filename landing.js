document.addEventListener("DOMContentLoaded", e => {

    loginButton.addEventListener("click", async e => {
        localStorage.token = await api.login({ 
            username: username.value, 
            password: password.value 
        });

        window.location = "/posts/"
    });

});