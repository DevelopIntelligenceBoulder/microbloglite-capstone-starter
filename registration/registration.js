window.onload = ()=>{
    async function register(registerData) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),

        };
        const res = await fetch(apiBaseURL + "/api/users", options);
        const success = await res.json();
        console.log(res.status);
        if (res.status === 201) {
            window.location.replace("/posts/index.html"); // redirect
        } else {
            console.error("registration unsuccessful");
        }
        return registerData;
}

    let registerForm = document.querySelector("#register");

    registerForm.addEventListener("submit", function(event){
        event.preventDefault();
        console.log("form submission successful");

        let registerData = {
            fullName: document.querySelector("#name").value,
            username: document.querySelector("#userName").value,
            password: document.querySelector("#password").value,
        };

        // registerForm.register-btn.disabled = true;

        register(registerData);
    });

}
