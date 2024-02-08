const urlBase = "138.197.67.189";
const extension = "php";

var userId = 0;
let userFirstName = "";
let userLastName = "";

let contactSearchList = [];
let contactList = [];
let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
				"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function doLogin()
{
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
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
				sessionStorage.setItem('userId', userId);
				sessionStorage.setItem('contactList', contactList);
				sessionStorage.setItem('letters', letters);
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
				saveCookie();
				window.location.href = "landing.html";
				console.log("cookie on landing= " + document.cookie);
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 500;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
	console.log("cookie= " + document.cookie);
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		//document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doRegister()
{
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
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{
					let err = jsonObject.error;
					document.getElementById("loginResult").innerHTML = err;
					return;
				}
	
				window.location.reload();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function addContact()
{
	console.log("cookie in addcontact= " + document.cookie);
	//readCookie();
	userId = sessionStorage.getItem('userId');
	console.log("UserId in addContact:", userId);
	let firstName = document.getElementById("contactFirst").value;
	let lastName = document.getElementById("contactLast").value;
	let phone = document.getElementById("contactPhone").value;
	let email = document.getElementById("contactEmail").value;
	//document.getElementById("contactAddResult").innerHTML = "";

	let tmp = {firstName:firstName,lastName:lastName,phone:phone,email:email,userid:userId};
	let jsonPayload = JSON.stringify( tmp );
	console.log("jsonPayload= " + jsonPayload);

	let url = 'http://' + urlBase + '/LAMPAPI/AddContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log("contact has been added");
				//document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				alert("Contact has been added");
				displayContacts();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		console.log(err.message);
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

// edit contact functions

function editContactClicked(id)
{
	userId = sessionStorage.getItem('userId');
	let firstName = document.getElementById("contactFirst").value;
	let lastName = document.getElementById("contactLast").value;
	let phone = document.getElementById("contactPhone").value;
	let email = document.getElementById("contactEmail").value;

	if (firstName !== "") {
		let tmp = {contactId:id,fieldToUpdate:"FirstName",newValue:firstName,userId:userId};
		let jsonPayload = JSON.stringify( tmp );
		editContact(jsonPayload);
	  }
	if (lastName !== "") {
		let tmp = {contactId:id,fieldToUpdate:"LastName",newValue:lastName,userId:userId};
		let jsonPayload = JSON.stringify( tmp );
		editContact(jsonPayload);
	  }
	  if (phone !== "") {
		let tmp = {contactId:id,fieldToUpdate:"Phone",newValue:phone,userId:userId};
		let jsonPayload = JSON.stringify( tmp );
		editContact(jsonPayload);
	  }
	  if (email !== "") {
		let tmp = {contactId:id,fieldToUpdate:"Email",newValue:email,userId:userId};
		let jsonPayload = JSON.stringify( tmp );
		editContact(jsonPayload);
	  }

	  alert("Contact portion has been edited successfully");
	  displayContacts();
}

function editContact(payLoad)
{
	console.log("jsonPayload= " + payLoad);

	let url = 'http://' + urlBase + '/LAMPAPI/EditContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				displayContacts();
				//document.getElementById("contactEditResult").innerHTML = "Contact has been edited successfully";
				alert("Contact has been edited successfully");
			}
		};
		xhr.send(payLoad);
	}
	catch(err)
	{
		document.getElementById("contactEditResult").innerHTML = err.message;
	}
}

// delete contact function
function deleteContact(id)
{
	userId = sessionStorage.getItem('userId');
	let tmp = {contactId:String(id),userId:userId};

    let jsonPayload = JSON.stringify(tmp);

    let url = 'http://' + urlBase + '/LAMPAPI/DeleteContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let deleteResult = JSON.parse(xhr.responseText);

                if (!(deleteResult.error)) {
                    alert("Contact deleted successfully!");
                    displayContacts();
                }
            }
        };

        xhr.send(jsonPayload);
    } catch (err) {
        console.error("Delete contact failed: " + err.message);
    }
}

function searchContactClicked()
{
	userId = sessionStorage.getItem('userId');
	let searchValue = document.getElementById("searchValue").value;

	let tmp = {searchParam:searchValue,userId:userId};

    let jsonPayload = JSON.stringify(tmp);

    let url = 'http://' + urlBase + '/LAMPAPI/SearchContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
				jsonObject = JSON.parse(jsonObject);
                if (jsonObject.error) {
                    console.log(jsonObject.error);
                    return;
                }
                let text = "<table border='1'>"
				//const contactArray = jsonObject.contacts;
                for (let i = 0; i < jsonObject.contacts.length; i++) {
                    text += "<tr id='row-" + i + "'>";
                    text += "<td id='first-name-" + i + "'><span>" + jsonObject.contacts[i].FirstName + "</span></td>";
                    text += "<td id='last-name-" + i + "'><span>" + jsonObject.contacts[i].LastName + "</span></td>";
                    text += "<td id='email-" + i + "'><span>" + jsonObject.contacts[i].Email + "</span></td>";
                    text += "<td id='phone-" + i + "'><span>" + jsonObject.contacts[i].Phone + "</span></td>";
                    text += "<td><button onclick='deleteContact(" + jsonObject.contacts[i].ID + ")'>Delete</button></td>";
                    text += "<td><button onclick=' editContactClicked(" + jsonObject.contacts[i].ID + ")'>Edit</button></td>";
                    text += "<tr/>"
                }

                text += "</table>"
                document.getElementById("table-body").innerHTML = text;
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

function displayContacts() {
	userId = sessionStorage.getItem('userId');
	contactList = sessionStorage.getItem('contactList');

	let tmp = {searchParam:"",userId:userId};

    let jsonPayload = JSON.stringify(tmp);

    let url = 'http://' + urlBase + '/LAMPAPI/SearchContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
				jsonObject = JSON.parse(jsonObject);
                if (jsonObject.error) {
                    console.log(jsonObject.error);
                    return;
                }
                let text = "<table border='1'>"
				//const contactArray = jsonObject.contacts;
                for (let i = 0; i < jsonObject.contacts.length; i++) {
                    text += "<tr id='row-" + i + "'>";
                    text += "<td id='first-name-" + i + "'><span>" + jsonObject.contacts[i].FirstName + "</span></td>";
                    text += "<td id='last-name-" + i + "'><span>" + jsonObject.contacts[i].LastName + "</span></td>";
                    text += "<td id='email-" + i + "'><span>" + jsonObject.contacts[i].Email + "</span></td>";
                    text += "<td id='phone-" + i + "'><span>" + jsonObject.contacts[i].Phone + "</span></td>";
                    text += "<td><button onclick='deleteContact(" + jsonObject.contacts[i].ID + ")'>Delete</button></td>";
                    text += "<td><button onclick=' editContactClicked(" + jsonObject.contacts[i].ID + ")'>Edit</button></td>";
                    text += "<tr/>"
                }

                text += "</table>"
                document.getElementById("table-body").innerHTML = text;
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

// change function to searchContact
function searchContact1(payLoad)
{
	console.log("jsonPayload= " + payLoad);

	let url = 'http://' + urlBase + '/LAMPAPI/SearchContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log("contact has been found");
				let jsonObject = JSON.parse( xhr.responseText );
				jsonObject = JSON.parse( jsonObject );
				
				for( let i=0; i<jsonObject.contacts.length; i++ )
				{
					contactSearchList += jsonObject.contacts[i];
				}
			}
		};
		xhr.send(payLoad);
	}
	catch(err)
	{
		//document.getElementById("contactSearchResult").innerHTML = err.message;
		console.log(err.message);
	}
	
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}