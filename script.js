//function for clearing the form
function clearForm() {
    document.getElementById("salutation").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("male").checked = true;
    document.getElementById("country").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("pincode").value = "";
    document.getElementById("qualification").value = "";
    document.getElementById("user_name").value = "";
    document.getElementById("password").value = "";
    document.getElementById("dateofbirth").value = "";
    document.getElementById('Address').value = "";
}

// for password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = 'visibility_off';
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = 'visibility';
    }
});


// js for 3 dot menu//
function openMenu(empID) {
    const dropDownContent = document.getElementById("dropdown-content-menu");

    dropDownContent.style.display = "block";
}
// end of 3 dot menu view//

//closing 3dot menu
function closeMenu() {
    const dropDownContent = document.getElementById("dropdown-content-menu");

    dropDownContent.style.display = "none";
}

//end of closing 3dot menu


// js for edit employee//
document.addEventListener("DOMContentLoaded", function () {
    const editDetailsLink = document.getElementById("editprofile_emp");
    const editEmpForm = document.getElementById("edit-emp-form");
    const overlay = document.getElementById("overlay");

    editDetailsLink.addEventListener("click", function () {
        editEmpForm.style.display = "block";
        overlay.style.display = "block";

    });
});

// js for closing buttonn in edit employee form
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("close_id_edit_emp");
    const editEmpForm = document.getElementById("edit-emp-form");
    const overlay = document.getElementById("overlay");

    closeButton.addEventListener("click", function () {

        editEmpForm.style.display = "none";
        overlay.style.display = "none";

    });
});



// js for view details button in 3dot list menu//
document.addEventListener("DOMContentLoaded", function () {
    const viewEmpProfile = document.getElementById("viewprofile_emp");

    viewEmpProfile.addEventListener("click", function () {
        window.location.href = "viewemployee.html";
    });
});

// for fetching the data from API 
//Adding employee  functionalities starts here

readEmployee();
async function readEmployee() {
    let temp = '';
    await fetch('http://localhost:3000/employees')
        .then(function (res) {
            return res.json();
        }).then(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                const employee = data[i];

                temp += `<tr class="emp-column">
                <td>${(i + 1)}</td>
                <td> <img class="profile-img" src="assets/dp2.png">${employee.firstName + " " + employee.lastName}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.gender}</td>
                <td>${employee.dob}</td>
                <td>${employee.country}</td>
                <td><button class="dot material-symbols-outlined" id="dot-menu" onclick=openMenu('${employee.id}')>
                        more_horiz
                    </button>
                    <!-- 3 dot dropdown menu -->
                    <div class="dropdown-content" id="dropdown-content-menu">
                    <ul>
                    <li><button class="option-menu" id="viewprofile_emp"><span
                                class="material-symbols-outlined icon">visibility</span> View
                            Details</button></li>
                    <li><button class="option-menu" id="editprofile_emp"><span
                                class="material-symbols-outlined icon">edit</span> Edit</button>
                    </li>
                    <li><button class="option-menu" id="deleteprofile_emp" onclick= deleteDataFromAPI('${employee.id}')><span
                                class="material-symbols-outlined icon">delete</span>
                            Delete</button></li>
                    <li><button class="option-menu-button" id="close-option-menu" onclick=closeMenu()>Close</button>
                    </li>
                </ul>
                    </div>
                    <!-- end of 3 dot dropdown menu -->
                </td>
                
                
                </tr>`;
            }
        });
    document.getElementById('employeetablebody').innerHTML = temp;

}
// end of fetch data from API

//js for creating and submitting new user/employee

const empForm_fetch = document.getElementById('addNewEmp');
empForm_fetch.addEventListener('click', function (e) {
    e.preventDefault();

    const salutation = document.getElementById("salutation").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dateofbirth").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    console.log(gender);

    //function for converting the format of date from yyyy-mm-dd to dd-mm-yyyy

    var dateofbirth = changeformat(dob);

    function changeformat(val) {
        const Array = val.split('-');
        let year = Array[0];
        let month = Array[1];
        let day = Array[2];
        let formatteddate = day + "-" + month + "-" + year;
        return formatteddate;
    }

    //const gender = document.querySelector('input[name="gender"]:checked').value

    const address = document.getElementById('Address').value;
    const country = document.getElementById('countySel').value;
    const state = document.getElementById('stateSel').value;
    const city = document.getElementById('districtSel').value;
    const pincode = document.getElementById('pincode').value;
    const qualifications = document.getElementById('qualification').value;
    const username = document.getElementById("user_name").value;
    const password = document.getElementById("password").value;


    // Create a new employee object

    const newEmployee = {
        salutation,
        firstName,
        lastName,
        email,
        phone,
        dob: dateofbirth,
        gender,
        address,
        country,
        state,
        city,
        pincode,
        qualifications,
        username,
        password
    };
    console.log("before validation/validation error!")
    console.log(newEmployee);


    // Sending the employee data to the server

    console.log(FormValidation())//for printing the rturn value form the function

    if (FormValidation()) {
        console.log("after validation")
        console.log(newEmployee);
        fetch('http://localhost:3000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployee)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Employee added:', data);


                FormValidationSuccessPopup();
                clearForm();//for clearing the forms
                readEmployee();

            })
            .catch(error => {
                console.error('Error adding employee:', error);
            });
    }

});

//form validation

function FormValidation() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dateofbirth").value;
    const address = document.getElementById('Address').value;
    const country = document.getElementById('countySel').value;
    const state = document.getElementById('stateSel').value;
    const city = document.getElementById('districtSel').value;
    const pincode = document.getElementById('pincode').value;
    const qualifications = document.getElementById('qualification').value;
    const username = document.getElementById("user_name").value;
    const password = document.getElementById("password").value;
    const salutation = document.getElementById("salutation").value;

    var errorMessageSalutation = document.getElementById("errormessageSalutation");
    var errorMessageFirstName = document.getElementById('errormessageFirstname');
    var errorMessageLastName = document.getElementById('errormessageLastname');
    var errorMessageEmail = document.getElementById('errormessageEmail');
    var errorMessagePhone = document.getElementById('errormessagePhone');
    var errorMessageDob = document.getElementById('errormessageDob');
    var errorMessageAddress = document.getElementById('errormessageAddress');
    var errorMessageQualification = document.getElementById('errormessageQualifications');
    var errorMessageCountry = document.getElementById('errormessageCountry');
    var errorMessageState = document.getElementById('errormessageState');
    var errorMessageCity = document.getElementById('errormessageCity');
    var errorMessagePin = document.getElementById('errormessagePin');
    var errorMessageUsrName = document.getElementById('errormessageUsrname');
    var errorMessagePass = document.getElementById('errormessagePass');

    let hasError = true;
    const validNamePattern = /^[A-Za-z]+$/; //for name validation

    //salutation 

    if (salutation === "") {
        errorMessageSalutation.style.display = 'flex';
        hasError = false;
    }
    else {
        errorMessageSalutation.style.visibility = 'hidden'
    }

    // first name
    if (firstName === "") {
        errorMessageFirstName.style.display = 'flex';
    }
    else if (!validNamePattern.test(firstName)) {
        errorMessageFirstName.style.display = 'flex';
        errorMessageFirstName.textContent = 'Invalid characters in first name';
        hasError = false;
    } else {
        errorMessageFirstName.style.display = 'none';
    }

    // last name
    if (lastName === "") {
        errorMessageLastName.style.display = 'flex';
    }
    else if (!validNamePattern.test(lastName)) {
        errorMessageLastName.style.display = 'flex';
        errorMessageLastName.style.textContent = 'Invalid characte in last name';
        hasError = false;

    }
    else {
        errorMessageLastName.style.display = 'none';
    }

    // email

    const validEmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email === "") {
        errorMessageEmail.style.display = 'flex';
    } else if (!validEmailPattern.test(email)) {
        errorMessageEmail.style.display = 'flex';
        errorMessageEmail.textContent = 'Invalid email format';
        hasError = false;
    } else {
        errorMessageEmail.style.display = 'none';
    }

    // phone number
    const validPhonePattern = /^\d{10}$/;

    if (phone === "") {
        errorMessagePhone.style.display = 'flex';
    } else if (!validPhonePattern.test(phone)) {
        errorMessagePhone.style.display = 'flex';
        errorMessagePhone.textContent = 'Invalid phone number';
        hasError = false;
    } else {
        errorMessagePhone.style.display = 'none';
    }

    //dob

    if (dob === "") {
        errorMessageDob.style.display = 'flex';
        hasError = false;
    } else {
        errorMessageDob.style.display = 'none';
    }

    //address

    if (address === "") {
        errorMessageAddress.style.display = 'flex';
        hasError = false;
    } else {
        errorMessageAddress.style.display = 'none';
    }

    //qualification

    if (qualifications === "") {
        errorMessageQualification.style.display = 'flex';
        hasError = false;
    } else {
        errorMessageQualification.style.display = 'none';
    }

    //country

    if (country === "" || country == "Select a country") {
        errorMessageCountry.style.display = 'flex';
        hasError = false;
    } else {
        errorMessageCountry.style.display = 'none';
    }

    //state

    if (state === "" || state == "Select a state") {
        errorMessageState.style.display = 'flex';
        hasError = false;
    } else {
        errorMessageState.style.display = 'none';
    }

    //city

    if (city === "" || city == 'Select a city') {
        errorMessageCity.style.display = 'flex';
        hasError = false;
    } else {
        errorMessageCity.style.display = 'none';
    }


    //pincode
    if (pincode === "") {
        errorMessagePin.style.display = 'flex';
        hasError = false;
    } else {
        errorMessagePin.style.display = 'none';
    }

    //usr name

    if (username === "") {
        errorMessageUsrName.style.display = 'flex';
        hasError = false;
    } else {
        errorMessageUsrName.style.display = 'none';
    }

    //password

    if (password === "") {
        errorMessagePass.style.display = 'flex';
        hasError = false;
    } else {
        errorMessagePass.style.display = 'none';
    }

    if (hasError == false) {
        return false;
    }
    else {
        return true;
    }
}

//end of validation

// code for popup in add employee button
function FormValidationSuccessPopup() {
    if (FormValidation()) {
       
        const ConformationPopup = document.getElementById("conformationpopup");
        const employeeForm = document.getElementById("emp-form");

            ConformationPopup.style.display = "block";
            employeeForm.style.display = "none";
        
    }
}

// Call the function somewhere in your code

const closeButtonConformationPopup = document.getElementById("close_modal_conformation");
const ConformationPopupclose = document.getElementById("conformationpopup");
const overlay = document.getElementById("overlay");

closeButtonConformationPopup.addEventListener("click", function () {
    ConformationPopupclose.style.display = "none";
    overlay.style.display = "none";
})

// closing emp sucess popup message

// cancel button in add emp form
const employeeForm = document.getElementById("emp-form");
const close_addempfrmbtn = document.getElementById("close_addempfrmbtn");
close_addempfrmbtn.addEventListener("click", function () {
    employeeForm.style.display = "none";
    overlay.style.display = "none";
})
// end


// woking of this code: when we click the add employee button on the main page a form will be popped up for creating a profile of new employee//
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("emp_add");
    const employeeForm = document.getElementById("emp-form");
    const overlay = document.getElementById("overlay");

    addButton.addEventListener("click", function () {

        employeeForm.style.display = "block";
        overlay.style.display = "block";
    });
});
//end of adding employee code//


// working of this code: when the closing icon is clicked the form will be closed form the main screen//
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("close_id");
    const employeeForm = document.getElementById("emp-form");
    const overlay = document.getElementById("overlay");

    closeButton.addEventListener("click", function () {

        employeeForm.style.display = "none";
        overlay.style.display = "none";
        clearForm();
    });
});

// function for deleting the employee from the api and also from the api
function deleteDataFromAPI(id) {
    console.log(id)

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("deleteprofile_emp").addEventListener("click", function () {
            $("#deletePopupModal").modal("show");
            overlay.style.display = "block";
        });
    });
    fetch(`http://localhost:3000/employees/${id}` , {
        method: 'DELETE',
})

    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        readEmployee();
        console.log('Data deleted successfully:', data);
    })
    .catch(error => {
        console.error('Error deleting data:', error);
    });
   
}


// js for modal popup for delete 


//end of js for mmodal popup delete

//js for closing modal popupp delete
document.addEventListener("DOMContentLoaded", function () {
    const closeButtonmodal = document.getElementById("close_modal_delete");
    const deleteModalPopupMessage = document.getElementById("deletePopupModal");
    const overlay = document.getElementById("overlay");

    closeButtonmodal.addEventListener("click", function () {
        deleteModalPopupMessage.style.display = "none";
        overlay.style.display = "none";



    });
});




