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
    dropDownContent.innerHTML = `
        <ul>
        <li><button class="option-menu" id="viewprofile_emp" onclick="openViewEmployeeDetails('${empID}')"><span
                    class="material-symbols-outlined icon">visibility</span> View
                Details</button></li>
        <li><button class="option-menu" id="editprofile_emp" onclick="openEditEmployee('${empID}')"><span
                class="material-symbols-outlined icon">edit</span> Edit</button>
        </li>
        <li><button class="option-menu" id="deleteprofile_emp" onclick= deleteDataFromAPI('${empID}')><span
                class="material-symbols-outlined icon">delete</span>
            Delete</button></li>
        <li><button class="option-menu-button" id="close-option-menu" onclick=closeMenu()>Close</button>
        </li>
        </ul>
    `;
    dropDownContent.style.display = "block";

}
// end of 3 dot menu view//

//closing 3dot menu
function closeMenu() {
    const dropDownContent = document.getElementById("dropdown-content-menu");

    dropDownContent.style.display = "none";
}

//end of closing 3dot menu


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


// for fetching the data from API 
//Adding employee  functionalities starts here
let data = [];

readEmployee();
async function readEmployee(data) {
    let temp = '';
    await fetch('http://localhost:3000/employees')
        .then(function (res) {
            return res.json();
        }).then(function (responseData) { // Use a different variable name to avoid conflicts
            data = responseData; // Assign the response data to the data variable
            console.log(data);

            const maxCountOnPage = 5;//its the number if data to be displayed on the page
            const totalPages = Math.ceil(data.length / maxCountOnPage);//finding the total pages as per the data
            pagination(totalPages);//returning the value to pagination function
            const start = maxCountOnPage * (CurrentPage - 1);
            const end = Math.min(maxCountOnPage * CurrentPage, data.length);
            for (var i = start; i < end; i++) {
                const employee = data[i];

                temp += `<tr class="emp-column">
                <td>${(i + 1)}</td>
                <td> <img class="profile-img" src='http://localhost:3000/employees/${employee.id}/avatar'>${employee.firstName + " " + employee.lastName}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.gender}</td>
                <td>${employee.dob}</td>
                <td>${employee.country}</td>
                <td>
                <button class="dot material-symbols-outlined" id="dot-menu" onclick=openMenu('${employee.id}')>
                        more_horiz
                    </button>
                    <!-- 3 dot dropdown menu -->
                    <div class="dropdown-content" id="dropdown-content-menu">
                   
                    </div>
                    <!-- end of 3 dot dropdown menu -->
                </td>
                
                
                </tr>`;
            }
        });
    document.getElementById('employeetablebody').innerHTML = temp;

}
// end of fetch data from API

// function for search the element from table
function searchEmployee() {
    const NoEmpPopup = document.getElementById("NoEmpFoundPopupModal");
    const overlay = document.getElementById("overlay");
    let input = document.getElementById("searchElements").value;
    input = input.toLowerCase();
    let tag = document.getElementsByTagName("tr");
    let foundEmployee = false; // Variable to track if any employees are found

    for (let i = 0; i < tag.length; i++) {
        console.log(tag.length);
        if (!tag[i].innerHTML.toLowerCase().includes(input)) {
            tag[i].style.display = "none";
        } else {
            tag[i].style.display = "table-row";
            foundEmployee = true; // Set to true if at least one employee is found
        }
    }

    // Display the modal only if no employees are found
    if (!foundEmployee) {
        NoEmpPopup.style.display = "block";//
        overlay.style.display = "block";
    } else {
        NoEmpPopup.style.display = "none"; // Hide the modal if employees are found
    }
}
//function for closing button in no employee popup 
const NoEmpPopup = document.getElementById("NoEmpFoundPopupModal");
const CloseEmpBtn = document.getElementById("CloseEmpNotFoundBtn");
const Closeoverlay = document.getElementById("overlay");

CloseEmpBtn.addEventListener("click", function () {
    NoEmpPopup.style.display = "none";
    Closeoverlay.style.display = "none";
    readEmployee();//refresh the page
})

//end of popup


//end of search employee

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

    // Function for converting the format of date from yyyy-mm-dd to dd-mm-yyyy
    var dateofbirth = changeformat(dob);

    function changeformat(val) {
        const Array = val.split('-');
        let year = Array[0];
        let month = Array[1];
        let day = Array[2];
        let formatteddate = day + "-" + month + "-" + year;
        return formatteddate;
    }

    const address = document.getElementById('Address').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
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

    // Sending the employee data to the server
    if (FormValidation()) {
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

            // Image upload
            const uploadImage = document.getElementById('input-file');
            const formData = new FormData();
            formData.append("avatar", uploadImage.files[0]);

            fetch(`http://localhost:3000/employees/${data.id}/avatar`, {
                method: 'POST',
                body: formData,
            })
            .then(res => {
                console.log('Image uploaded:', res);
                FormValidationSuccessPopup();
                clearForm();
                readEmployee();
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
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
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
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
        errorMessageSalutation.style.display = 'none'
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
    clearForm();
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


// working of this code: when the closing icon is clicked the add  form will be closed form the main screen//
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
function deleteDataFromAPI(empid) {
    $("#deletePopupModal").modal("show");//shpwing the delete poopup modal
    overlay.style.display = "block";

    console.log(empid)

    const deleteEmp = document.getElementById("deleteEmployee");
    deleteEmp.addEventListener("click", function () {
        fetch(`http://localhost:3000/employees/${empid}`, {
            method: 'DELETE',

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {

                console.log('Data deleted successfully:', data);

                function openSucessdeleteModal(){
                    const openSucessdeleteModal=document.getElementById("DeleteSucesspopup");
                    const Openoverlay=document.getElementById("overlay");
                    openSucessdeleteModal.style.display="block";
                    Openoverlay.style.display="block";
                }
                openSucessdeleteModal();
                readEmployee();

            })
    })


        .catch(error => {
            console.error('Error deleting data:', error);
        });

}


//js for closing modal popupp delete

document.addEventListener("DOMContentLoaded", function () {
    const deleteButtonmodal = document.getElementById("deleteEmployee");
    const deleteModalPopupMessage = document.getElementById("deletePopupModal");
    const overlay = document.getElementById("overlay");

    deleteButtonmodal.addEventListener("click", function () {
        deleteModalPopupMessage.style.display = "none";
        overlay.style.display = "none";

    });

})

//opening delete modal
function openDeletepopup() {
    document.getElementById("deleteprofile_emp").addEventListener("click", function () {
        $("#deletePopupModal").modal("show");
        overlay.style.display = "block";
    });

}

//function for opening the view employee page

function openViewEmployeeDetails(empid) {

    const viewEmpProfile = document.getElementById("viewprofile_emp");

    viewEmpProfile.addEventListener("click", function () {
        window.location.href = `viewemployee.html?id=${empid}`;


    });
}
//end of view employee details
//js for modal closing in delete employee
const modalDelete = document.getElementById("close_modal_delete_sucess");
const deletePopupModal = document.getElementById("DeleteSucesspopup");
const Overlay = document.getElementById("overlay");

modalDelete.addEventListener("click", function () {
    Overlay.style.display = "none";
    deletePopupModal.style.display = "none";
})

//end of modal delte close
// function for appeaaring edit employee
  


// pagination 

var CurrentPage = 1;

function pagination(totalPages) {
    console.log(totalPages);
    var pgnum = document.getElementById("PageNumBtns"); // div element where the pagination buttons are displayed
    let temp = '';

    for (let i = 1; i <= totalPages; i++) {
        temp += `<button id="page${i}">${i}</button>`;
    }

    pgnum.innerHTML = temp;

    pgnum.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            const pageNumber = parseInt(e.target.textContent);
            if (!isNaN(pageNumber)) {
                CurrentPage = pageNumber;
                readEmployee();
            }
        }
    });

    var pageLeftButton = document.getElementById("pageleft");
    var pageRightButton = document.getElementById("pageright");

    // Use CSS to control button visibility
    if (CurrentPage === 1) {
        pageLeftButton.classList.add('hidden');
    } else {
        pageLeftButton.classList.remove('hidden');
    }

    if (CurrentPage === totalPages) {
        pageRightButton.classList.add('hidden');
    } else {
        pageRightButton.classList.remove('hidden');
    }

    pageLeftButton.addEventListener("click", function () {
        if (CurrentPage > 1) {
            CurrentPage--;
            readEmployee();
        }
    });

    pageRightButton.addEventListener("click", function () {
        if (CurrentPage < totalPages) {
            CurrentPage++;
            readEmployee();
        }
    });
}

//end of pagination

function openEditEmployee(empid) {
    const openEditEmployeeForm = document.getElementById("edit-emp-form");
    const overlay = document.getElementById("overlay");

    openEditEmployeeForm.style.display = "block";
    overlay.style.display = "block";

    console.log("before fetch in edit");

    fetch(`http://localhost:3000/employees/${empid}`)
        .then(function (res) {
            return res.json();
        }).then(function (data) {
            console.log(data);

            document.getElementById("Editsalutation").value = data.salutation;
            document.getElementById("EditfirstName").value = data.firstName;
            document.getElementById("EditlastName").value = data.lastName;
            document.getElementById("Editemail").value = data.email;
            document.getElementById("Editphone").value = data.phone;
            document.getElementById("Editdateofbirth").value = changeformat(data.dob);

            function changeformat(val) {
                const Array = val.split('-');
                let day = Array[2];
                let month = Array[1];
                let year = Array[0];
                let formatteddate = day + "-" + month + "-" + year;
                return formatteddate;
            }

            document.getElementById("EditAddress").value = data.address;
            document.getElementById("Editcountry").value = data.country;
            document.getElementById("Editstate").value = data.state;
            document.getElementById("Editcity").value = data.city;
            document.getElementById("Editpincode").value = data.pincode;
            document.getElementById("Edituser_name").value = data.username;
            document.getElementById("Editpassword").value = data.password;
            document.getElementById("Editqualification").value = data.qualifications;
            document.querySelector(".gender").value = data.gender;

            //image preview
            let viewimage=document.getElementById("view-img-section")
            viewimage.src=`http://localhost:3000/employees/${empid}/avatar'`

            var empupdate = document.getElementById('formupdate');
            empupdate.addEventListener('click', async (e) => {
                e.preventDefault();

                let editdateformat = document.getElementById("Editdateofbirth").value;
                console.log(editdateformat);
                let editdate = changeformat(editdateformat);

                const updatedEmployeeData = {
                    salutation: document.getElementById("Editsalutation").value,
                    firstName: document.getElementById("EditfirstName").value,
                    lastName: document.getElementById("EditlastName").value,
                    email: document.getElementById("Editemail").value,
                    phone: document.getElementById("Editphone").value,
                    dob: editdate,
                    country: document.getElementById("Editcountry").value,
                    state: document.getElementById("Editstate").value,
                    address: document.getElementById("EditAddress").value,
                    city: document.getElementById("Editcity").value,
                    pincode: document.getElementById("Editpincode").value,
                    qualifications: document.getElementById("Editqualification").value,
                    username: document.getElementById("Edituser_name").value,
                    password: document.getElementById("Editpassword").value,
                    gender: document.querySelector('input[name="gender"]:checked').value
                };
                console.log(updatedEmployeeData);

                // Use await to wait for the fetch request to complete
                await fetch(`http://localhost:3000/employees/${empid}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(updatedEmployeeData),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        readEmployee();
                        function close_editform() {
                            openEditEmployeeForm.style.display = "none";
                            overlay.style.display = "none";
                        }
                        close_editform(); // Call the function to close the form
                    })
            });
        });
}
//image uploading

const dropArea = document.getElementById('drop-area');//area for image uoloading
const inputFile = document.getElementById('input-file');
const imgView = document.getElementById('img-view');
inputFile.addEventListener("change", uploadImage);
function uploadImage() {
    let imgLink = URL.createObjectURL(inputFile.files[0]);//creating url for image
    const imgTAG = document.createElement('img');
    imgTAG.src = imgLink;
    imgView.textContent = " ";//removing the image one the employee is added
    imgView.appendChild(imgTAG);
    imgView.style.border = 0;
    imgView.style.width = '200px';

}
//end of image uploading
