/*------ js for toggle form ------*/

var loginForm = document.getElementById("login-form");
var registrationForm = document.getElementById("registration-form");
var indicator = document.getElementById("indicator");

function login() {
    registrationForm.style.transform = "translateX(300px)";
    loginForm.style.transform = "translateX(300px)";
    indicator.style.transform = "translateX(0px)"
}

function register() {
    registrationForm.style.transform = "translateX(0px)";
    loginForm.style.transform = "translateX(0px)";
    indicator.style.transform = "translateX(100px)"
}