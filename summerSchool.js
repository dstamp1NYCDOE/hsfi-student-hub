var submitBtn = document.getElementById('submitButton')
container_div = document.getElementById('container')
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


    returnStudentHTML(StudentInfo)
      
    for (span of btn_toggles){
        span.classList.toggle('visually-hidden')
    }

}





function returnStudentHTML(StudentInfo){
    var StudentID = StudentInfo.StudentID
    var lastName = StudentInfo.LastName
    var firstName = StudentInfo.FirstName
    var sending_school_name = StudentInfo.SendingSchoolName
    var FirstPeriodOfDay = StudentInfo.FirstPeriodOfDay
    var isZLTA = StudentInfo.isZLTA
    var isExamOnly = StudentInfo.isExamOnly


    var period1details = StudentInfo.Period1Details
    var period2details = StudentInfo.Period2Details
    var period3details = StudentInfo.Period3Details

    background_color = "white";
    
    container_div.className = '';
    switch (FirstPeriodOfDay){
      case 1:
        container_div.classList.add('bg-primary')
        break;
      case 2:
        container_div.classList.add('bg-success')
        break;
      case 3:
        container_div.classList.add('bg-info')
        break;    
    }


    var response_div = document.getElementById("response")
    

    response_div.innerHTML = `
    <div class="card" style="background-color:${background_color}">
        <div class="card-body">
            <h5 class="card-title">Program Info</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${firstName} ${lastName}</li>
                <li class="list-group-item">First Period of Day: ${FirstPeriodOfDay}</li>
                <li class="list-group-item">${sending_school_name}</li>
            </ul>            
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Period 1: ${period1details}</li>
            <li class="list-group-item">Period 2: ${period2details}</li>
            <li class="list-group-item">Period 3: ${period3details}</li>
        </ul>
    </div>
    `

    if (isZLTA) {
        container_div.className = '';
        container_div.classList.add('bg-danger')
        response_div.innerHTML = `
        <h2>${firstName} ${lastName} (${StudentID}) </h2>
        <h2>NO CLASSES</h2>
        <h3>${sending_school_name}</h3>
        <p>You are not enrolled in any summer school classes at this time. Connect with your home school for next steps</p>
    `
    
    }

    if (isExamOnly) {
        container_div.className = '';
        container_div.classList.add('bg-warning')
        response_div.innerHTML = `
        <h2>${firstName} ${lastName} (${StudentID}) </h2>
        <h2>Regents Exam Only</h2>
        <h3>${sending_school_name}</h3>
        <p>You are not enrolled in any summer school classes at this time, you are signed up for August Regents Exams. You will be sent additional information in August.</p>
    `
    
    }


}