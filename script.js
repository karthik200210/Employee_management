// woking of this code: when we click the add employee button on the main page a form will be popped up for creating a profile of new employee//
document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("emp_add");
    const employeeForm = document.getElementById("emp-form");

    addButton.addEventListener("click", function () {

        employeeForm.style.display = employeeForm.style.display === "none" ? "block" : "none";
    });
});
//end of adding employee code//

// working of this code: when the closing icon is clicked the form will be closed form the main screen//
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("close_id");
    const employeeForm = document.getElementById("emp-form");

    closeButton.addEventListener("click", function () {

        employeeForm.style.display = employeeForm.style.display = "none";

    });
});
// end of closing employee form//

// 3 dot menu//

document.addEventListener("DOMContentLoaded", function () {
    const dotButton = document.getElementById("dot-menu");
    const dropDownContent = document.getElementById("dropdown-content-menu");

    dotButton.addEventListener("click", function () {
        dropDownContent.style.display = dropDownContent.style.display === "none" ? "block" : "none";
    });
});

// end of 3 dot menu view//


// js for edit employee//
document.addEventListener("DOMContentLoaded", function () {
    const editDetailsLink = document.getElementById("editprofile_emp");
    const editEmpForm = document.getElementById("edit-emp-form");

    editDetailsLink.addEventListener("click", function () {
        editEmpForm.style.display = editEmpForm.style.display === "none" ? "block" : "none";
    });
});

// js for closing buttonn in edit employee form
document.addEventListener("DOMContentLoaded", function () {
    const closeButton = document.getElementById("close_id_edit_emp");
    const editEmpForm = document.getElementById("edit-emp-form");

    closeButton.addEventListener("click", function () {

        editEmpForm.style.display = editEmpForm.style.display = "none";

    });
});
// end of closing button in edit employee form

//end of js for edit empoyee form//

// js for close button in the 3 dot option list
document.addEventListener("DOMContentLoaded", function () {
    const closeButtonInOptionMenu = document.getElementById("close-option-menu");
    const dropDownContent = document.getElementById("dropdown-content-menu");

    closeButtonInOptionMenu.addEventListener("click", function () {
        dropDownContent.style.display = dropDownContent.style.display = "none";
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

document.addEventListener("DOMContentLoaded",function(){
    const deleteEmpbtn=document.getElementById("deleteprofile_emp");
    const deletePopupMessage=document.getElementById("exampleModalCenter");
     
    deleteEmpbtn.addEventListener("click",function(){
        deletePopupMessage.style.display=deletePopupMessage.style.display==="none" ? "block" : "none";
    })
})
//end of js for mmodal popup delete