window.onload = onLoad;

const d = document;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// * Prepare login page before load renders
function onLoad() {
  const form = $("#formUser");
  const inputs = form.querySelectorAll("input");
  form.addEventListener("submit", logIn);
  inputs.forEach((input) => input.addEventListener("invalid", invalidForm));

  isRemembered();
}

// * Handle events invalidForm
function invalidForm(event) {
  const errorMsg = $("#wrongLogin");

  // check if the error is already show
  if (!errorMsg.classList.contains("show")) {
    // show error
    new bootstrap.Collapse(errorMsg).show();

    // set timer to hide error
    setTimeout(() => {
      new bootstrap.Collapse(errorMsg).hide();
    }, 5000);
  }
}

// * Handle login, get fields and check if they are valid
function logIn(event) {
  event.preventDefault();

  const email = event.target.Email.value;
  const pass = event.target.Password.value;
  const remember = event.target.RememberCheck.checked;

  if (checkLogin(email, pass, remember)) {
    console.log("pass");
    window.location.href = "../pages/Main/main.html";
  } else {
    // trigger invalidForm event
    $("#wrongLogin").dispatchEvent(new Event("invalid"));
  }
}

// * Check if exists email and password from localStorage, if not, show an error
function checkLogin(email, pass, remember) {
  const db = localStorage.getItem("users");
  const users = JSON.parse(db);
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].pass === pass) {
      // save user in localStorage if check remember is true
      if (remember) rememberUser(users[i]);
      return true;
    }
  }
  return false;
}

// * Save info user in localStorage
function rememberUser(dataUser) {
  localStorage.setItem("currentUser", JSON.stringify(dataUser));
}

// * Set info user on form fields if is remembered
function isRemembered() {
  const local = localStorage.getItem("currentUser");
  const user = JSON.parse(local);
  if (user) {
    $("#Email").value = user.email;
    $("#Password").value = user.pass;
    $("#RememberCheck").checked = "true";
  }
}
