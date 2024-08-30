function preventFormSubmit() {
var forms = document.querySelectorAll('form');
for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', function(event) {
    event.preventDefault();
    });
}
}
window.addEventListener('load', preventFormSubmit);

function onSubmit(event){
    var StudentID = document.getElementById("StudentID").value
    var sheet_title = document.getElementById("sheet_title").value
    const url = 'https://script.google.com/macros/s/AKfycbwG2MoTtCTaeHcQAlbBQOtNMl0qNzZ4d_5MEfCxZfcWTo5XkoCvNxfHb8s9rsVy3nvy/exec'
    const endpoint = url + "?StudentID=" + StudentID + "&sheet_title=" + sheet_title;;

    var response_div = document.getElementById("response")
    response_div.innerHTML = ''
    
    btn_toggles = document.getElementsByClassName('btn_toggle')

    for (span of btn_toggles){
        span.classList.toggle('visually-hidden')
    }
    startup = true

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', endpoint, true)

    request.onload = function () {
        var data = JSON.parse(this.response)
        var StudentInfo = data.data

        if (sheet_title == 'FirstDayRoomAssignment'){
            returnFirstDayOfSchoolHTML(StudentInfo)
        }
        
        for (span of btn_toggles){
            span.classList.toggle('visually-hidden')
        }
    }

    request.onerror = function (){
    var response_div = document.getElementById("response")

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

    // Send request
    request.send()
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