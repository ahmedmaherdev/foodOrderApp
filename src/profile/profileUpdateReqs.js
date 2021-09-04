import { profile } from './profile.js';
import {UpdateCardcontainer} from './profile.js';
let token = localStorage.getItem('user-token');
// delete My account 
export const deleteAccount = () => {
    
    fetch('https://panda-restaurant.herokuapp.com/api/v1/users/deleteMe', {
        method: 'Delete',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => {
        localStorage.setItem('user-logged', false);
        localStorage.setItem('user-token', '');
        window.location = '../index.html';
    })

    .catch(error => alert('Request Failed, Try Later'))
}


export const updateNameEmail = async(objectData) => {
    const response = await fetch('https://panda-restaurant.herokuapp.com/api/v1/users/updateMe', {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectData)
    })
    const data = await response.json();
    if(data.status === 'success') {
        const {user} = data;
        profile(user);
        UpdateCardcontainer.innerHTML= '';
        UpdateCardcontainer.style.padding = '0rem';
    } else {
        alert('Request Failed, Try Later')
    }
    
    
}

export const changePassword = async (objectData) => {
    const response = await fetch('https://panda-restaurant.herokuapp.com/api/v1/users/updateMyPassword', {
        method: 'PATCH',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objectData)
    })

    const data = await response.json();
    if(data.status === 'success') {
        localStorage.setItem('user-token', data.token);
        UpdateCardcontainer.innerHTML= '';
        UpdateCardcontainer.style.padding = '0rem';
    }
}