let token = localStorage.getItem('user-token');
const getUser = async token => {
  const response = await fetch(
    'https://panda-restaurant.herokuapp.com/api/v1/users/me',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const {
    data: { data: result },
  } = await response.json();
  console.log(result);
  profile(result);
};

getUser(token);

const cardUser = document.getElementById('cardUser');
export const profile = profileData => {
  const profileInfo = `
    <div class="row m-l-0 m-r-0">
        <div class="col-sm-4 bg-c-lite-green user-profile">
            <div class="card-block text-center text-white">
                <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"> </div>
                <h6 class="f-w-600">${profileData.name}</h6>
                <p>Web Designer</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
            </div>
        </div>
        <div class="col-sm-8">
            <div class="card-block">
                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                <div class="row">
                    <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Name</p>
                        <h6 class="text-muted f-w-400">${profileData.name}</h6>
                    </div>
                    <div class="col-sm-6">
                        <p class="m-b-10 f-w-600">Email</p>
                        <h6 class="text-muted f-w-400">${profileData.email}</h6>
                    </div>
                </div>
                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Settings</h6>
                <div class="row">
                    <div class="col-sm-6">
                        <button type="button" class="btn btn-danger">change Password</button>
                    </div>
                    <div class="col-sm-6">
                        <button type="button" class="btn btn-danger">Delete my account</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
  cardUser.innerHTML = profileInfo;
};

// sign out

const signout = () => {
  localStorage.setItem('user-logged', false);
  localStorage.setItem('user-token', '');
  window.location = '../index.html';
};

const signoutBtn = document.getElementById('signoutBtn');
signoutBtn.addEventListener('click', signout);
