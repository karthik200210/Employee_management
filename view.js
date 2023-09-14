

let params = new URLSearchParams(document.location.search);
let empid = params.get("id");
console.log(empid);

function detailsEmployee(empid) {
    fetch(`http://localhost:3000/employees/${empid}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(employee => {
            console.log(employee);


            document.getElementById("container_view_profile").innerHTML =
             `
             <div class=" profile row pt-3 rounded-4 mb-5">
             <div class="col">
                 <div class="bg_image">
                     <img src="assets/bg img profile.png" alt="">
                 </div>
             </div> 
         <!-- dp view -->
         <div class="profile_pic" id="profile_pic">
         <img class="profile-img" src="E:/dummy api/dummy-employee-api/public/avatars/${employee.id}.jpg">
             </div>
             <div class="col ">
                 <div class=" user_name_row row-10 mt-lg-5  "id="user_name_row">
                 ${employee.firstName + " " + employee.lastName}
                 </div>
                 <div class="row user_email_id_row mb-3" id="user_email_id_row">
                 ${employee.email}
                 </div>
             </div> 
         <!-- dp view end -->

         <!-- employee deails row starting -->
         <div class="row ">
                <div class="col-4">
                     <div class="column-container details_box rounded-4" id="user_gender">
                         <label>Gender</label>
                         <div> ${employee.gender}</div>
                     </div>
                 </div>
                 <div class="col-4">
                     <div class="column-container details_box rounded-4" id="user_age">
                         <label>Age</label>
                     </div>
                 </div>
                 <div class="col-4">
                     <div class="column-container details_box rounded-4" id="user_dob">
                         <label>Date of Birth</label>
                         <div> ${employee.dob}</div>
                     </div>
                 </div>
             </div>

             <div class="row mt-4 ">
                 <div class="col-6">
                     <div class="column-container details_box rounded-4" id="user_phone">
                         <label>Mobile Number</label>

                         <div> ${employee.phone}</div>
                     </div>
                 </div>

                 <div class="col-6">
                     <div class="column-container details_box rounded-4" id="user_qualifications">
                         <label>Qualifications</label>
                         <div> ${employee.qualifications}</div>
                     </div>
                 </div>
             </div>

             <div class="row mt-4 ">
                 <div class="col-6">
                     <div class="column-container details_box rounded-4" id="user_address">
                         <label>Address</label>
                         <div> ${employee.address}</div>
                     </div>
                 </div>

                 <div class="col-6">
                     <div class="column-container details_box rounded-4" id="user_name">
                         <label>User Name</label>
                         <div> ${employee.username}</div>
                     </div>
                 </div>
             </div>

             <div class=" row mb-3 mt-3 ">
                 <div class="final_submit mb-3  p-3  rounded-3  ">
                     <div class="contents_submit ">
                         <button class="final_abort">Delete</button>
                         <button class="submission">Edit Details</button>
                     </div>
                 </div>
             </div>
           `;


        })
}

detailsEmployee(empid); 