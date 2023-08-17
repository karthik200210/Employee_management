//function for clearing the form
function clearForm() {
    document.getElementById("salutation").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("male").checked = true; // Assuming "male" is the default
    document.getElementById("Address").value = "";
    document.getElementById("country").value = "";
    document.getElementById("state").value = "";
    document.getElementById("city").value = "";
    document.getElementById("pincode").value = "";
    document.getElementById("qualification").value = "";
    document.getElementById("user_name").value = "";
    document.getElementById("password").value = "";
}


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

// code for popup in add employee button
const ConformationPopup = document.getElementById("conformationpopup");
const AddEmpsubmit = document.getElementById("addNewEmp");
const employeeForm = document.getElementById("emp-form");

AddEmpsubmit.addEventListener("click", function () {
    ConformationPopup.style.display = "block";
    employeeForm.style.display = "none";


})
//end of add emp popup
const closeButtonConformationPopup = document.getElementById("close_modal_conformation");
const ConformationPopupclose = document.getElementById("conformationpopup");
const overlay = document.getElementById("overlay");

closeButtonConformationPopup.addEventListener("click", function () {
    ConformationPopupclose.style.display = "none";
    overlay.style.display = "none";
})

// closing emp sucess popup message

// end of emp success
// cancel button in add emp form
const close_addempfrmbtn = document.getElementById("close_addempfrmbtn");
close_addempfrmbtn.addEventListener("click", function () {
    employeeForm.style.display = "none";
    overlay.style.display = "none";
})

// working of this code: when the closing icon is clicked the form will be closed form the main screen//
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("close_id");
    const employeeForm = document.getElementById("emp-form");
    const overlay = document.getElementById("overlay");

    closeButton.addEventListener("click", function () {

        employeeForm.style.display = "none";
        overlay.style.display = "none";

    });
});
// end of closing employee form//

// js for 3 dot menu//
function openMenu(empID) {
    const dropDownContent = document.getElementById("dropdown-content-menu");
    dropDownContent.innerHTML = `<ul>
    <li><button class="option-menu" id="viewprofile_emp"><span
                class="material-symbols-outlined icon">visibility</span> View
            Details</button></li>
    <li><button class="option-menu" id="editprofile_emp"><span
                class="material-symbols-outlined icon">edit</span> Edit</button>
    </li>
    <li><button class="option-menu" id="deleteprofile_emp"><span
                class="material-symbols-outlined icon">delete</span>
            Delete</button></li>
    <li><button class="option-menu-button" id="close-option-menu" onclick=closeMenu()>Close</button>
    </li>
</ul>`;
    dropDownContent.style.display = "block";
}
// end of 3 dot menu view//

//closing 3dot menu
function closeMenu() {
    const dropDownContent = document.getElementById("dropdown-content-menu");

    console.log("Hello1");
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
//js end

// js for modal popup for delete 

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    document.getElementById("deleteprofile_emp").addEventListener("click", function () {
        $("#deletePopupModal").modal("show");
        overlay.style.display = "block";
    });
});

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
// for fetching the data from API

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
                <td>${+ (i + 1)}</td>
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
                      
                    </div>
                    <!-- end of 3 dot dropdown menu -->
                </td>
                
                
                </tr>`;
            }
        });
    document.getElementById('employeetablebody').innerHTML = temp;

}
// end of fetch data from API

//js for creating and submitting new user/empployee//
const empForm_fetch = document.getElementById('addNewEmp');
empForm_fetch.addEventListener('click', function (e) {
    e.preventDefault();

    const salutation = document.getElementById("salutation").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const address = document.getElementById('Address').value;
    const country = document.getElementById('country').value;
    const state = document.getElementById('state').value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    const qualification = document.getElementById('qualification').value;
    const username = document.getElementById("user_name").value;
    const password = document.getElementById("password").value;


    // Create a new employee object
    const newEmployee = {
        salutation,
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        address,
        country,
        state,
        city,
        pincode,
        qualification,
        username,
        password
    };

    // Send the employee data to the server
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

            // Call a function to update the table with the new employee
            // Function to clear the form fields

            clearForm();

        })
        .catch(error => {
            console.error('Error adding employee:', error);
        });

});


