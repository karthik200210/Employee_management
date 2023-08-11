// woking of this code: when we click the add employee button on the main page a form will be popped up for creating a profile of new employee//
document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("emp_add");
    const employeeForm = document.getElementById("emp-form");

    addButton.addEventListener("click", function() {

        employeeForm.style.display = employeeForm.style.display === "none" ? "block" : "none";
    });
});
//end of adding employee code//
// wroking of this code: when the closing icon is clicked the form will be closed form the main screen//
document.addEventListener("DOMContentLoaded", function() {
    const closeButton = document.getElementById("close_id");
    const employeeForm = document.getElementById("emp-form");

    closeButton.addEventListener("click", function() {

        employeeForm.style.display = employeeForm.style.display = "none";
        
    });
});
// end of closing employee form//