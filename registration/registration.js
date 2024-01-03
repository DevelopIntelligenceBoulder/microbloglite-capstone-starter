window.onload = ()=>{
    function register(registerData) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
          
        };
        return fetch(apiBaseURL + "/api/users", options)
    .then((res) => res.json())
    .then((success) => {
    //   console.log(registerData,success);
      if (success.status === '200') {
            window.location.replace("/posts/index.html"); // redirect 
      } else{
        console.error("registration unsuccessful");
      }

      return registerData;
    });
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
