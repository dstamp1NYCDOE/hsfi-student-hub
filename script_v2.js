var submitBtn = document.getElementById('submitButton')
var data;

function preventFormSubmit() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', function(event) {
        event.preventDefault();
        });
    }
}

function loadData(){
    var sheet_title = document.getElementById("sheet_title").value
    const url = 'https://script.google.com/macros/s/AKfycbyDuQT_5I9TT-3dKrv7I8RZRJUEL7Ee0HYmNdySIFRsN3VsNhDCulLIfx3titEQKSbEbA/exec'
    const endpoint = url + "?sheet_title=" + sheet_title;
    var request = new XMLHttpRequest()
    request.open('GET', endpoint, true)
    request.onload = function () {
        data = JSON.parse(this.response).data
        submitBtn.classList.toggle('visually-hidden')
    }
    request.onerror = function (){
        console.log("Error")
    }
    request.send()        
}

window.addEventListener('load', preventFormSubmit);
window.addEventListener('load', loadData);


function onSubmit(event){
    var response_div = document.getElementById("response")
    response_div.innerHTML = ''
        
    var StudentID = document.getElementById("StudentID").value
    StudentID = parseInt(StudentID)
    
    var StudentInfo = data.find(item => item.StudentID === StudentID);

    if (StudentInfo == undefined){

        response_div.innerHTML = `
        <div class="card" style="background-color:red">
            <div class="card-body">
                <h5 class="card-title">Student Not Found</h5>
                <p class="card-text">A student with the OSIS ${StudentID} is not available in the data.  Please check your StudentID number and try again.</p>
            </div>
        </div>
        `    
        for (span of btn_toggles){
            span.classList.toggle('visually-hidden')
        }         
    }



    
    btn_toggles = document.getElementsByClassName('btn_toggle')

    for (span of btn_toggles){
        span.classList.toggle('visually-hidden')
    }

    var sheet_title = document.getElementById("sheet_title").value
    if (sheet_title == 'FirstDayRoomAssignment'){
        returnFirstDayOfSchoolHTML(StudentInfo)
    }
    if (sheet_title == 'PSATRoomAssignment'){
        returnPSATRoomAssignmentHTML(StudentInfo)
    }        
    for (span of btn_toggles){
        span.classList.toggle('visually-hidden')
    }

}

function returnFirstDayOfSchoolHTML(StudentInfo){
    var StudentID = StudentInfo.StudentID
    var LastName = StudentInfo.LastName
    var FirstName = StudentInfo.FirstName
    var Room = StudentInfo.Room
    var GradeLevel = StudentInfo.GradeLevel

    background_color = "white";
    switch (GradeLevel) {
    case 9:
        background_color = "blue";
        break;
    case 10:
        background_color = "pink";
        break;
    case 11:
        background_color = "yellow";
        break;
    case 12:
        background_color = "green";
        break;
    }


    var response_div = document.getElementById("response")

    response_div.innerHTML = `
    <div class="card" style="background-color:${background_color}">
        <div class="card-body">
            <h5 class="card-title">First Day of School Room Assignment</h5>
            <p class="card-text">This is your assigned room location for the first day of school</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${FirstName} ${LastName}</li>
            <li class="list-group-item"><strong>Room ${Room}</strong></li>
        </ul>
    </div>
    `

}



function returnPSATRoomAssignmentHTML(StudentInfo){
    var StudentID = StudentInfo.StudentID
    var LastName = StudentInfo.LastName
    var FirstName = StudentInfo.FirstName
    var Room = StudentInfo.Room
    var AssignedActivity = StudentInfo.AssignedActivity
    var Assignment = StudentInfo.Assignment
    var ReportDate = StudentInfo.ReportDate
    var ReportTime = StudentInfo.ReportTime

    background_color = "white";
    switch (AssignedActivity) {
    case 'PSAT':
        background_color = "pink";
        break;
    case 'SAT':
        background_color = "yellow";
        break;
    case 'CTE_Studio':
        background_color = "green";
        break;
    }


    var response_div = document.getElementById("response")

    response_div.innerHTML = `
    <div class="card" style="background-color:${background_color}">
        <div class="card-body">
            <h5 class="card-title">P/SAT Day Room Assignment</h5>
            <p class="card-text">This is your assigned room location for the SAT or PSAT day - can be different - on ${ReportDate}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${FirstName} ${LastName}</li>
            <li class="list-group-item">Assignment:${AssignedActivity} ${Assignment}</li>
            <li class="list-group-item"><strong>Room ${Room}</strong></li>
            <li class="list-group-item"><strong>Report Time ${ReportTime}</strong></li>
        </ul>
    </div>
    `

}