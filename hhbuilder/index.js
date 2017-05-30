var form = document.querySelector("form");

document.querySelector("form").addEventListener("submit", validateForm);

function helloWorld() {
  // alert("The form was submitted")
}

function validateForm() {
  alert("The form was submitted")
    var form = document.querySelector("form");
    var age = form.elements["age"]
    var relationship = form.elements["rel"]
    var smoker = form.elements["smoker"]
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}
