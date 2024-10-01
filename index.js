const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// function to show Error//
function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// function to show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// function to check valid email
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 if (re.test(input.value.trim()) ){
        showSuccess(input);
 }else{
    showError(input,`Please provide a valid email`)
    }
}

// function to check if required fields have data 
function checkRequired(inputArray){
    inputArray.forEach(function(input){
        if (input.value===''){
            console.log(input.id);
            showError(input,`${getFieldId(input)} is required`);
        }else{
            showSuccess(input);
        }
    });
    }

// Check the length of input field
function checkLength(input, min ,max){
    if(input.value.length<min){
        showError(input,`${getFieldId(input)}need to be at least ${min} characters `);
    }
    else if(input.value.length> max){
        showError(input,`${getFieldId(input)} need to be less than ${max}`);
    }else{
        showSuccess(input);
    }
}


//Function to check password and confirm password matched
function checkPasswordsMatch(input1,input2) {  
    if(input1.value !== input2.value){
        showError(input2,`Passwords don't match`)
    }
}

// Function to get the id of the input field with proper case
function getFieldId(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// this is an event listener for the form on submit
form.addEventListener('submit',function(e){
    e.preventDefault();

    checkRequired([username,email,password,password2]);
    checkLength(username,3,10);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordsMatch(password,password2);
})
