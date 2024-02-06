const urlBase = "138.197.67.189";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;
  console.log("user/pass= " + login);
  console.log(password);
  //	var hash = md5( password );

  document.getElementById("loginResult").innerHTML = "";

  let tmp = { login: login, password: password };
  //	var tmp = {login:login,password:hash};
  let jsonPayload = JSON.stringify(tmp);
  console.log("jsonPayload= " + jsonPayload);

  let url = "http://" + urlBase + "/LAMPAPI/Login." + extension;
  //let url = '/var/www/html/LAMPAPI/Login.' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          document.getElementById("loginResult").innerHTML =
            "User/Password combination incorrect";
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        window.location.href = "landing.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

function doRegister() {
  // reset required red borders
  document.getElementById("registerFirstName").className = "ele";
  document.getElementById("registerLastName").className = "ele";
  document.getElementById("registerLogin").className = "ele";
  document.getElementById("registerPassword").className = "ele";

  // collect values from form
  let firstName = document.getElementById("registerFirstName").value;
  let lastName = document.getElementById("registerLastName").value;
  let login = document.getElementById("registerLogin").value;
  let password = document.getElementById("registerPassword").value;

  if (firstName === "") {
    document.getElementById("registerFirstName").className = "ele required";
    document.getElementById("registerResult").innerHTML =
      "Please fill out all fields";
    return;
  }
  if (lastName === "") {
    document.getElementById("registerLastName").className = "ele required";
    document.getElementById("registerResult").innerHTML =
      "Please fill out all fields";
    return;
  }
  if (login === "") {
    document.getElementById("registerLogin").className = "ele required";
    document.getElementById("registerResult").innerHTML =
      "Please fill out all fields";
    return;
  }
  if (password === "") {
    document.getElementById("registerPassword").className = "ele required";
    document.getElementById("registerResult").innerHTML =
      "Please fill out all fields";
    return;
  }

  // create json payload
  let tmp = {
    login: login,
    password: password,
    firstName: firstName,
    lastName: lastName,
  };

  // resets fields
  userId = 0;
  firstName = "";
  lastName = "";
  document.getElementById("registerResult").innerHTML = "";

  let jsonPayload = JSON.stringify(tmp);
  console.log("jsonPayload= " + jsonPayload);

  let url = "http://" + urlBase + "/LAMPAPI/Register." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          let error = jsonObject.error;
          document.getElementById("loginResult").innerHTML = err;
          return;
        }

        window.location.reload();
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function addContact() {
  document.getElementById("contactFirst").className = "ele";
  document.getElementById("contactLast").className = "ele";
  document.getElementById("contactPhone").className = "ele";
  document.getElementById("contactEmail").className = "ele";

  // collect values from form
  let firstName = document.getElementById("contactFirst").value;
  let lastName = document.getElementById("contactLast").value;
  let phone = document.getElementById("contactPhone").value;
  let email = document.getElementById("contactEmail").value;

  if (firstName === "") {
    document.getElementById("contactFirst").className = "ele required";
    document.getElementById("contactAddResult").innerHTML =
      "Please fill out all fields";
    return;
  }
  if (lastName === "") {
    document.getElementById("contactLast").className = "ele required";
    document.getElementById("contactAddResult").innerHTML =
      "Please fill out all fields";
    return;
  }
  if (phone === "") {
    document.getElementById("contactPhone").className = "ele required";
    document.getElementById("contactAddResult").innerHTML =
      "Please fill out all fields";
    return;
  }
  if (email === "") {
    document.getElementById("contactEmail").className = "ele required";
    document.getElementById("contactAddResult").innerHTML =
      "Please fill out all fields";
    return;
  }

  let tmp = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    userId: userId,
  };
  // resets fields
  userId = 0;
  firstName = "";
  lastName = "";
  phone = "";
  email = "";
  document.getElementById("contactAddResult").innerHTML = "";

  let jsonPayload = JSON.stringify(tmp);
  console.log("jsonPayload= " + jsonPayload);

  let url = "http://" + urlBase + "/LAMPAPI/AddContact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          let error = jsonObject.error;
          document.getElementById("contactAddResult").innerHTML = err;
          return;
        }
        window.location.reload();
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("contactAddResult").innerHTML = err.message;
  }
}

function searchContact() {
  let srch = document.getElementById("searchText").value;
  document.getElementById("colorSearchResult").innerHTML = "";

  let colorList = "";

  let tmp = { search: srch, userId: userId };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/SearchColors." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("colorSearchResult").innerHTML =
          "Color(s) has been retrieved";
        let jsonObject = JSON.parse(xhr.responseText);

        for (let i = 0; i < jsonObject.results.length; i++) {
          colorList += jsonObject.results[i];
          if (i < jsonObject.results.length - 1) {
            colorList += "<br />\r\n";
          }
        }

        document.getElementsByTagName("p")[0].innerHTML = colorList;
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("colorSearchResult").innerHTML = err.message;
  }
}
