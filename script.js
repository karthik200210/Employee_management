// woking of this code: when we click the add employee button on the main page a form will be popped up for creating a profile of new employee//
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("emp_add");
    const employeeForm = document.getElementById("emp-form");
    const overlay = document.getElementById("overlay");

    addButton.addEventListener("click", function () {

        employeeForm.style.display ="block";
        overlay.style.display ="block";
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
        overlay.style.display ="none";

    });
});
// end of closing employee form//

// 3 dot menu//

document.addEventListener("DOMContentLoaded", function () {
    const dotButton = document.getElementById("dot-menu");
    const dropDownContent = document.getElementById("dropdown-content-menu");

    dotButton.addEventListener("click", function () {
        dropDownContent.style.display = "block";
    });
});

// end of 3 dot menu view//


// js for edit employee//
document.addEventListener("DOMContentLoaded", function () {
    const editDetailsLink = document.getElementById("editprofile_emp");
    const editEmpForm = document.getElementById("edit-emp-form");
    const overlay = document.getElementById("overlay");

    editDetailsLink.addEventListener("click", function () {
        editEmpForm.style.display = "block";
        overlay.style.display ="block";
        
    });
});

// js for closing buttonn in edit employee form
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("close_id_edit_emp");
    const editEmpForm = document.getElementById("edit-emp-form");
    const overlay = document.getElementById("overlay");

    closeButton.addEventListener("click", function () {

        editEmpForm.style.display = "none";
        overlay.style.display ="none";

    });
});
// end of closing button in edit employee form

//end of js for edit empoyee form//

// js for close button in the 3 dot option list
document.addEventListener("DOMContentLoaded", function () {
    const closeButtonInOptionMenu = document.getElementById("close-option-menu");
    const dropDownContent = document.getElementById("dropdown-content-menu");

    closeButtonInOptionMenu.addEventListener("click", function () {
        dropDownContent.style.display = "none";
    })
})
// end of close button in the 3 dot option list

// js for view details button in 3dot list menu//
document.addEventListener("DOMContentLoaded", function () {
    const viewEmpProfile = document.getElementById("viewprofile_emp");

    viewEmpProfile.addEventListener("click", function () {
        window.location.href = "viewemployee.html";
    });
});
//js end

// js for modal popup for delete 

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById("overlay");
    document.getElementById("deleteprofile_emp").addEventListener("click", function() {
        $("#deletePopupModal").modal("show");
        overlay.style.display="block";
    });
});
 
//end of js for mmodal popup delete
//js for closing modal popupp delete
document.addEventListener("DOMContentLoaded",function(){
    const closeButtonmodal = document.getElementById("close_modal_delete");
    const deleteModalPopupMessage=document.getElementById("deletePopupModal");
    const overlay = document.getElementById("overlay");

    closeButtonmodal.addEventListener("click",function(){
        deleteModalPopupMessage.style.display="none";
        overlay.style.display="none";

       
        
    });
});
// for fetching the data from API

fetch('http://localhost:3000/employees').then(function(res) {
    return res.json();
}).then(function(data) {
    console.log(data);
});

// end of fetch data from API
