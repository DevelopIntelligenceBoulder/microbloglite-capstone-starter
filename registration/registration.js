window.onload = () => {

    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const password1 = document.getElementById('password');
    const password2 = document.getElementById('password2');

    let count = 0;

    form.addEventListener('submit', e => {
        if (count != 5) {
            count = 0;
            e.preventDefault(); // prevents form from submitting
            count = valdateInputs();
        }
        else {
            form.submit();
        }
    });

    //function that will set our field to error and return a message
    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    //function that will set our field to success
    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }
    const valdateInputs = () => {
        const userValue = username.value.trim();
        const fnameValue = fname.value.trim();
        const lnameValue = lname.value.trim();
        const password1Value = password1.value.trim();
        const password2Value = password2.value.trim();
        //username validation
        if (userValue === '') {
            setError(username, 'Username is required')
        }
        else if (userValue.length < 6 || userValue.charAt(0) != userValue.charAt(0).toUpperCase()) {
            setError(username, 'Username must be 6 characters or more and Uppercase')
        }
        else {
            setSuccess(username);
            count++;
        }

        //first name validation
        if (fnameValue === '') {
            setError(fname, 'Enter a First Name');
        }
        else if (fnameValue.length < 3) {
            setError(fname, 'First Name must be 3 Characters or more');
        }
        else {
            setSuccess(fname);
            count++;
        }

        //last name validation
        if (lnameValue === '') {
            setError(lname, 'Enter a Last Name');
        }
        else if (lnameValue.length < 3) {
            setError(lname, 'Last Name must be 3 Characters or more');
        }
        else {
            setSuccess(lname);
            count++;
        }

        //password validation
        if (password1Value === '') {
            setError(password1, 'Enter a Password');
        }
        else if (password1Value.length < 6) {
            setError(password1, 'Password must be 6 characters or more')
        }
        else if (password1Value.charAt(0) != password1Value.charAt(0).toUpperCase()) {
            setError(password1, 'Password must be uppercase')
        }
        else {
            setSuccess(password1);
            count++;
        }

        //password confirmation validation
        if (password2Value === '') {
            setError(password2, 'Enter a Password');
        }
        else if (password1Value != password2Value) {
            setError(password2, 'Passwords do not match');
        }
        else {
            setSuccess(password2);
            count++;
        }
        if (count == 5) {
            RegisterUser(userValue, fnameValue, lnameValue, password1Value);
        }
        return count;
    }
}

function RegisterUser(user, fname, lname, pass) {
    let bodyData = {
        username: user,
        fullName: fname + ' ' + lname,
        password: pass
    }
    console.log(bodyData);
    const url = 'https://microbloglite.herokuapp.com/api/users'
    fetch(url, {
        method: 'POST', 
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('form').style.border = '4px solid aqua';
        document.getElementById('successMessage').innerText = 'SuccessFully Registered';
    })
}