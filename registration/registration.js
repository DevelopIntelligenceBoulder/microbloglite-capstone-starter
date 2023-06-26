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
  
      if (response.ok) {
        window.open('../index.html', '_blank')
        let files = response.json()
        console.log(files)
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
 
      }
    } catch (error) {
      console.error('Registration failed:', error);

    }
  };
