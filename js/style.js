// Start for Control coding
let registerForm = document.getElementById('register-form');
let allInput = registerForm.querySelectorAll('input');

let addBtn = document.querySelector('#add-btn');
let modal = document.querySelector('#modal');
let closeBtn = document.querySelector('#close-btn');

addBtn.onclick = function () {
  modal.classList.add('active');
};

closeBtn.addEventListener('click', function () {
  modal.classList.remove('active');
  let i;
  for (i = 0; i < allInput.length; i++) {
    allInput[i].value = '';
  }
});

// start all global variable

var userData = [];

let idEl = document.getElementById('id');
let nameEl = document.getElementById('name');
let lastNameEl = document.getElementById('l-name');
let emailEl = document.getElementById('email');
let officeEl = document.getElementById('office-code');
let jobTitleEl = document.getElementById('job-title');
let registerBtn = document.querySelector('#register-btn');
let updateBtn = document.querySelector('#update-btn');

let imgUrl;
// end all global variable

// Start register coding

registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();
  getDataFromLocal();
  registerForm.reset('');
  closeBtn.click();
};
if (localStorage.getItem('userData') != null) {
  userData = JSON.parse(localStorage.getItem('userData'));
  console.log(userData);
}

const registrationData = () => {
  userData.push({
    id: idEl.value,
    name: nameEl.value,
    lastName: lastNameEl.value,
    email: emailEl.value,
    office: officeEl.value,
    jobTitle: jobTitleEl.value,
    profilePic: imgUrl == undefined ? 'img/avatar.png' : imgUrl,
  }); //pusing all the objects data to emplty arrray userData

  let userString = JSON.stringify(userData); // converting all key value pair in form of string so that we can se locals storage
  localStorage.setItem('userData', userString); //user data is key and userString is value

  swal('Good job!', 'Registration Success!', 'success');
};

//start returning data on page from localStorage

let tableData = document.querySelector('#table-data');

const getDataFromLocal = () => {
  tableData.innerHTML = '';

  userData.forEach((data, index) => {
    tableData.innerHTML += `
    <tr index='${index}'>
    <td>${index + 1}</td>
    <td><img src="${data.profilePic}" width="40" height="40"></td>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.lastName}</td>
    <td>${data.email}</td>
    <td>${data.office}</td>
    <td>${data.jobTitle}</td>
    <td>
      <button class="edit-btn"><i class="fa fa-eye"></i></button>
      <button class="del-btn"><i class="fa fa-trash"></i></button>
    </td>
  </tr>
    `;
  });

  // Start delete section

  let i;
  let allDelBtn = document.querySelectorAll('.del-btn');

  console.log(allDelBtn);

  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var id = tr.getAttribute('index');
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this imaginary file!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userData.splice(id, 1);
          localStorage.setItem('userData', JSON.stringify(userData));
          tr.remove();
          swal('Poof! Your imaginary file has been deleted!', {
            icon: 'success',
          });
        } else {
          swal('Your imaginary file is safe!');
        }
      });
    };
  }

  //Sart update coding

  let allEdit = document.querySelectorAll('.edit-btn');

  for (i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let td = tr.getElementsByTagName('td');
      let index = tr.getAttribute('index');
      let imgTag = td[1].getElementsByTagName('img');
      let profilepic = imgTag[0].src;
      let id = td[2].innerHTML;
      let name = td[3].innerHTML;
      let lName = td[4].innerHTML;
      let email = td[5].innerHTML;
      let officeCode = td[6].innerHTML;
      let jobTitle = td[7].innerHTML;
      addBtn.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      idEl.value = id;
      nameEl.value = name;
      lastNameEl.value = lName;
      emailEl.value = email;
      officeEl.value = officeCode;
      jobTitleEl.value = jobTitle;
      profilePic.src = profilepic;
      updateBtn.onclick = function (e) {
        userData[index] = {
          id: idEl.value,
          name: nameEl.value,
          lastName: lastNameEl.value,
          email: emailEl.value,
          office: officeEl.value,
          jobTitle: jobTitleEl.value,
          profilePic: uploadPic.value == '' ? profilePic.src : imgUrl,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
      };
    };
  }
};

getDataFromLocal();

// Image processing

let profilePic = document.querySelector('#profile-pic');
let uploadPic = document.querySelector('#upload-field');

uploadPic.onchange = function () {
  if (uploadPic.files[0].size < 1000000) {
    let fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profilePic.src = imgUrl;
    };
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert('File size is too long');
  }
};

//start search coding

let searchEl = document.querySelector('#emp');
searchEl.oninput = function () {
  searchFuc();
};

function searchFuc() {
  let tr = tableData.querySelectorAll('TR');
  let filter = searchEl.value.toLowerCase();
  let i;
  for (i = 0; i < tr.length; i++) {
    let id = tr[i].getElementsByTagName('td')[2].innerHTML;
    let name = tr[i].getElementsByTagName('td')[3].innerHTML;
    let l_name = tr[i].getElementsByTagName('td')[4].innerHTML;
    let email = tr[i].getElementsByTagName('td')[5].innerHTML;

    if (id.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = '';
    } else if (name.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = '';
    } else if (l_name.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = '';
    } else if (email.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
  }
}

//Clear all data

let delAllBtn = document.querySelector('#del-all-btn');
let allDelBox = document.querySelector('#del-all-box');

delAllBtn.addEventListener('click', () => {
  if (allDelBox.checked == true) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem('userData');
        window.location = location.href;
        swal('Poof! Your imaginary file has been deleted!', {
          icon: 'success',
        });
      } else {
        swal('Your imaginary file is safe!');
      }
    });
  } else {
    swal('Check the Box!', 'Please check the box to delete data', 'warning');
  }
});
