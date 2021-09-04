import {UpdateCardcontainer} from './profile.js';
import { updateNameEmail, changePassword, deleteAccount } from './profileUpdateReqs.js'
export const updateMainInfo = (wrapper, data) => {
    const mainInfo = `
        <div class="row mb-3">
            <div class="col-sm-3">
                <label for="updateName" class="mb-0">Name</label>
            </div>
            <div class="col-sm-9 text-secondary">
            <input type="text" id="updateName" class="form-control" value="${data.name}">
            </div>
        </div>
    <div class="row mb-3">
        <div class="col-sm-3">
            <label for="updateEmail" class="mb-0">Email</label>
        </div>
        <div class="col-sm-9 text-secondary">
            <input type="text" id="updateEmail" class="form-control" value="${data.email}">
        </div>
    </div>
    <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-4 text-secondary">
            <input type="button" class="btn btn-danger px-4" value="Save Changes" id="saveChangedInfo">
        </div>
        <div class="col-sm-4 text-secondary">
            <input type="button" id="cancelUpdateProfile" class="btn btn-danger px-4" value="Cancel">
        </div>
    </div>
    
    `;
    wrapper.style.padding = '2rem';
    wrapper.innerHTML = mainInfo;

    cancelUpdateProfile.addEventListener('click', ()=> {
        cancelUpdate()
    })

    saveChangedInfo.addEventListener('click', () => {
        const data = {
            name: updateName.value,
            email: updateEmail.value
        }
        updateNameEmail(data)
    })
}

/* End update profile */

export const updatePassword = (wrapper) => {
    const newPasswordForm = `
        <div class="row mb-3">
            <div class="col-sm-3">
                <label for="currentPassword" class="mb-0">Current Password</label>
            </div>
            <div class="col-sm-9 text-secondary">
                <input id="currentPassword" type="password" class="form-control" value="">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-3">
                <label for="newPassword" class="mb-0">New Password</label>
            </div>
            <div class="col-sm-9 text-secondary">
                <input type="password" id="newPassword" class="form-control" value="">
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-sm-3">
                <label for="confirmNewPassword" class="mb-0">Confirm New Password</label>
            </div>
            <div class="col-sm-9 text-secondary">
                <input id="confirmNewPassword" type="password" class="form-control" value="">
            </div>
        </div>

        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-4 text-secondary">
                <input type="button" class="btn btn-danger px-4" value="Save Changes" id="saveChangedpassword">
            </div>
            <div class="col-sm-4 text-secondary">
                <input type="button" id="cancelUpdatePassword" class="btn btn-danger px-4" value="Cancel">
            </div>
        </div>
    `;
    wrapper.style.padding = '2rem';
    wrapper.innerHTML = newPasswordForm;

    saveChangedpassword.addEventListener('click', () => {
        const data = {
            passwordCurrent: currentPassword.value,
            password: newPassword.value,
            passwordConfirm: confirmNewPassword.value
        }
        changePassword(data)
    })

    cancelUpdatePassword.addEventListener('click', ()=> {
        cancelUpdate()
    })
}

export const deleteProfile = () => {
    const deleteContent = `
    <div class="row">
        <div class="col-sm-4">
            <p>Are you sure that you want to delete your account?</p>
        </div>
        <div class="col-sm-4 text-secondary">
            <input type="button" class="btn btn-danger px-4" value="Delete" id="onDeleteAcount">
        </div>
        <div class="col-sm-4 text-secondary">
            <input type="button" id="cancelDelete" class="btn btn-danger px-4" value="Cancel">
        </div>
    </div>
    `
    UpdateCardcontainer.style.padding = '2rem';
    UpdateCardcontainer.innerHTML = deleteContent;

    cancelDelete.addEventListener('click', ()=> {
        cancelUpdate()
    })

    onDeleteAcount.addEventListener('click', ()=> {
        deleteAccount()
    })
}



function cancelUpdate() {
    UpdateCardcontainer.style.padding = '0rem';
    UpdateCardcontainer.innerHTML = '';
}