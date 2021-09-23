// console.log('here')
const resetBtn = document.querySelector('#restSubmit')
const resetEmail = document.querySelector('#resetEmail');
const sentSucceeded = document.querySelector('#sentSucceeded')

const validateEmail = (value) => {
    if(value ==='' && value.trim().length === 0 && !value.includes('@')){
        resetEmail.classList.add('is-invalid')
    }
    else{
        forgotPassword(value)
    }
}

const forgotPassword = async(email) => {
     await fetch('https://panda-restaurant.herokuapp.com/api/v1/users/forgotPassword', {
        method: 'POST',
        body: {email: email}
    }).then(response =>  response.json())
    .then(data => {
        console.log(data)
        if(data.status === 'success'){
            sentSucceeded.innerHTML = 'we have sent you an email, please check your inbox';
            sentSucceeded.style.display = 'block'
        } else {
            sentSucceeded.style.color = 'red'
            sentSucceeded.innerHTML = data.message;
            sentSucceeded.style.display = 'block'
        }
    })
}

resetBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    validateEmail(resetEmail.value)
})
