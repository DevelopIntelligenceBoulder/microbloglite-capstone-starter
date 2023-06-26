function createAccount() {
  
}

let passShow = document.getElementById('passShow')
let passHide = document.getElementById('passHide')
let passInput = document.getElementById('exampleInputPassword1')

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