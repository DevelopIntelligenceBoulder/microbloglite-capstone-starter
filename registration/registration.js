
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

const registerUser = async (event) => {

    event.preventDefault();
    const fullName = document.getElementById('Inputfullname').value
    const username = document.getElementById('InputUsername').value
    const password = passInput.value
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
        document.getElementById('InputUsername').classList.add('newAccSuccess')
            setTimeout(() => {
                newAccAlert.classList.remove('hide')
                document.getElementById('InputUsername').classList.remove('newAccSuccess')
            }, 500);
            setTimeout(() => {
                window.location.href = '../index.html'
            }, 2000);
      } else if (response.status === 400) {
        if (!(newAccAlert.classList.contains('hide'))){
            newAccAlert.classList.add('hide')
        }
            let userName = document.getElementById('InputUsername')
            const showError = document.createElement('p')
            showError.textContent = 'Username Aliready Exists!'
            showError.setAttribute('class', 'showError')
            userName.insertAdjacentElement('afterend', showError)
            userName.classList.add('dupe')

        setTimeout(() => {
            userName.classList.remove('dupe')
            showError.remove()
        }, 1500);

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

  let regForm = document.getElementById('regForm')
  regForm.onsubmit = registerUser

  // light/dark mode
let lightIco = document.getElementById('lightIco')
let darkIco = document.getElementById('darkIco')

  function darkMod() {
    document.body.classList.remove('light')
    lightIco.classList.remove('hide')
    darkIco.classList.add('hide')

  }

  function lightMod() {
    document.body.classList.add('light')
    darkIco.classList.remove('hide')
    lightIco.classList.add('hide')
  }
  // light/dark mode end
