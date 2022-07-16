window.onload = onLoad;

const d = document;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// * Event to add events to the form
function onLoad() {
  const form = $("#formUser");
  const inputs = form.querySelectorAll("input");
  form.addEventListener("submit", registerUser);
  inputs.forEach((input) => input.addEventListener("invalid", InvalidForm));
}

// * Event to handle invalid form
function InvalidForm(event) {

  // set timer to show and hide the error message
  const timerShow = (tagError) => {
    // check if the error is already show
    if (!tagError.classList.contains("show")) {
      // show error
      new bootstrap.Collapse(tagError).show();

      // set timer to hide error
      setTimeout(() => {
        new bootstrap.Collapse(tagError).hide();
      }, 5000);
    }
  };

  const target = event.target;

  switch (target.id) {
    case "Name":
      timerShow($("#wrongName"));
      break;
    case "Email":
      timerShow($("#wrongEmail"));
      break;
    case "Password":
      timerShow($("#wrongPassword"));
      break;
    default:
      alert("Something went wrong");
      break;
  }
}

// * Event to Validate and register an user
function registerUser(event) {
  event.preventDefault();

  const name = event.target.Name.value;
  const email = event.target.Email.value;
  const pass = event.target.Password.value;
  const confirmPass = event.target.ConfirmPassword.value;
  const gender = event.target.radioGender.value;

  if (checkPassword(pass, confirmPass)) return;

  const newUser = {
    name,
    email,
    pass,
    gender,
  };

  addUserJson(newUser);
  alert("User added!");
  globalThis.location.href = "/";
}

// * Add an user in localStorage
function addUserJson(newUser) {
  const currentUsers = localStorage.getItem("users");
  if (!currentUsers) localStorage.setItem("users", JSON.stringify([newUser]));
  else {
    const users = JSON.parse(currentUsers);
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  }
  
}

// * Validate password and confirm password
function checkPassword(pass, confirmPass) {
  const inputPass = $("input[type='Password']");

  if (pass < 8)
    return inputPass.dispatchEvent(
      new CustomEvent("invalid", {
        detail: "Password must be at least 8 characters",
      })
    );

  if (pass !== confirmPass)
    return inputPass.dispatchEvent(
      new CustomEvent("invalid", {
        detail: "Password and confirm password don't match",
      })
    );

  return false;
}
