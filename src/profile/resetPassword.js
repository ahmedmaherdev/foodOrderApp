const resetPassword = document.querySelector('#resetPassword')
const confirmResetPassword = document.querySelector('#confirmResetPassword')
const feedback= document.querySelector('#feedback')
const saveResetPassword = document.querySelector('#saveResetPassword')
const cancelResetPassword = document.querySelector('#cancelResetPassword')



 const validatePassword = (data) => {
     const token = '78fa8e0c892da40858fdbd17867dc513dce5fac4c8becced75c1cdef36d58200';
    const {pass, confirmPass} = data;
    if(pass.trim().length !== 0){
        if(pass.length < 6){
            feedback.innerHTML = "password can't be less than 6 chracters ";
            feedback.style.display = 'block';
        } else {
            if(pass === confirmPass) {
                //make the request
                console.log(pass,confirmPass)
                resetPasswordReq(token, pass, confirmPass)
    
            } else {
                feedback.innerHTML = "password don't match ";
                feedback.style.display = 'block';
            }
        }
    } else {
        resetPassword.classList.add('is-invalid')
        feedback.innerHTML = "password can't be empty ";
        feedback.style.display = 'block';
    }
}

saveResetPassword.addEventListener('click', () => {
    const data = {
        pass: resetPassword.value,
        confirmPass: confirmResetPassword.value
    }

    validatePassword(data)
})

cancelResetPassword.addEventListener('click', () => {
    const url = '/index.html';
    window.location = `${url}`;
})

const resetPasswordReq = async ( token, pass, confirmPass ) => {
    const response = await fetch(`https://panda-restaurant.herokuapp.com/api/v1/users/resetPassword/${token}`, {
        method: 'PATCH',
        body: {
            password: pass,
            passwordconfirm: confirmPass
        }
    })
    const data = await response.json();
    console.log(data)
}