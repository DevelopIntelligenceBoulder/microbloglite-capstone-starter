function createAccount() {
  
}

let passShow = document.getElementById('passShow')
let passHide = document.getElementById('passHide')
let passInput = document.getElementById('InputPassword1')

function passShowClick(){
    passShow.classList.add('hide')
    passHide.classList.remove('hide')
    passInput.type = 'text'

}

function passHideClick(){
    passInput.type = 'password'
    passHide.classList.add('hide')
    passShow.classList.remove('hide')
    
}

// registration 

const registerUser = async () => {
    
    const fullName = document.getElementById('Inputfullname').value
    const username = document.getElementById('InputUsername').value
    const password = document.getElementById('InputPassword1').value

    try {
      const response = await fetch('https://microbloglite.herokuapp.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, username, password })
      });

  let newAccAlert = document.getElementById('newAccAlert')

      if (response.ok) {
        newAccAlert.classList.remove('hide')
            setTimeout(() => {
                window.location.href = '../index.html'
            }, 2000);
      } else {
        if (!(newAccAlert.classList.contains('hide'))){
            newAccAlert.classList.add('hide')
        }
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);

      }
    } catch (error) {
      console.error('Registration failed:', error);

    }
  };
