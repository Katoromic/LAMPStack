//const urlBase = "138.197.67.189";
const urlBase = "chompersphonebook.xyz";
const extension = "php";

var userId = 0;
let userFirstName = "";
let userLastName = "";

let contactSearchList = [];
let contactList = [];

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
		xhr.onreadystatechange = async function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
				userFirstName = jsonObject.firstName;
				userLastName = jsonObject.lastName;
				sessionStorage.setItem('userId', userId);
				sessionStorage.setItem('userFirstName', userFirstName);
				sessionStorage.setItem('userLastName', userLastName);

		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				
				saveCookie();
				const getContactsResult = await getContacts("");
				console.log(getContactsResult);
				//let contacts = JSON.stringify(contactList);
				//sessionStorage.setItem('contactList', contacts);
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
					document.getElementById("registerResult").innerHTML = err;
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
		xhr.onreadystatechange = async function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log("contact has been added");
				//document.getElementById("contactAddResult").innerHTML = "Contact has been added";
				alert("Contact has been added successfully");
				const getContactsResult = await getContacts("");
				console.log(getContactsResult);
				loadContacts(6);
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

async function editContactClicked(id)
{
	userId = sessionStorage.getItem('userId');
	let firstName = document.getElementById("contactFirst").value;
	let lastName = document.getElementById("contactLast").value;
	let phone = document.getElementById("contactPhone").value;
	let email = document.getElementById("contactEmail").value;

	if (firstName !== "") {
		let tmp = {contactId:id,fieldToUpdate:"FirstName",newValue:firstName,userId:userId};
		let jsonPayload = JSON.stringify( tmp );
		const editContactResult = await editContact(jsonPayload);
		console.log(editContactResult);
	  }
	if (lastName !== "") {
		let tmp = {contactId:id,fieldToUpdate:"LastName",newValue:lastName,userId:userId};
		let jsonPayload = JSON.stringify( tmp );
		const editContactResult = await editContact(jsonPayload);
		console.log(editContactResult);
	  }
	  if (phone !== "") {
		let tmp = {contactId:id,fieldToUpdate:"Phone",newValue:phone,userId:userId};
		let jsonPayload = JSON.stringify( tmp );
		const editContactResult = await editContact(jsonPayload);
		console.log(editContactResult);
	  }
	  if (email !== "") {
		let tmp = {contactId:id,fieldToUpdate:"Email",newValue:email,userId:userId};
		let jsonPayload = JSON.stringify( tmp );
		const editContactResult = await editContact(jsonPayload);
		console.log(editContactResult);
	  }

	  alert("Contact has been edited successfully");
	  clearContactList();
	  const getContactsResult = await getContacts("");
	  console.log(getContactsResult);
		location.reload();
}

function editContact(payLoad)
{
	return new Promise((resolve, reject) => {
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
				resolve("edited contact portion successfully");
			}
		};
		xhr.send(payLoad);
	}
	catch(err)
	{
		document.getElementById("contactEditResult").innerHTML = err.message;
	}
});
}

// delete contact function
function deleteContact(id)
{
	if (!confirm("Are you sure you want to delete contact?"))
	{
		return;
	}
	userId = sessionStorage.getItem('userId');
	let tmp = {contactId:String(id),userId:userId};

    let jsonPayload = JSON.stringify(tmp);

    let url = 'http://' + urlBase + '/LAMPAPI/DeleteContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = async function () {
            if (this.readyState == 4 && this.status == 200) {
                let deleteResult = JSON.parse(xhr.responseText);

                if (!(deleteResult.error)) {
                    //alert("Contact deleted successfully!");
                    const getContactsResult = await getContacts("");
					console.log(getContactsResult);
					//clearContactList();
					//currentIndex = 0;
					clearContactList();
					location.reload();
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
        xhr.onreadystatechange = async function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
				jsonObject = JSON.parse(jsonObject);
                if (jsonObject.error) {
                    console.log(jsonObject.error);
                    return;
                }
                //let text = "<table border='1'>"
				// get contacts with new param
				console.log("searched for " + searchValue);
                const getContactsResult = await getContacts(searchValue);
				console.log(getContactsResult);
				clearContactList();
				location.reload();
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
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

function goAbout()
{
	window.location.href = "about.html";
}

// pull all contacts into an array to display
function getContacts(param) {
	return new Promise((resolve, reject) => {
	userId = sessionStorage.getItem('userId');
	console.log("gatheirng " + userId);

	let tmp = {searchParam:param,userId:userId};
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
					let contacts = [];
					sessionStorage.setItem('contactList', contacts);
					resolve("no contacts found");
                    console.log(jsonObject.error);
                    return;
                }
				//const contactArray = jsonObject.contacts;
				contactList = jsonObject.contacts;
				let contacts = JSON.stringify(contactList);
				sessionStorage.setItem('contactList', contacts);
				console.log("got contacts" + contactList);
				resolve("resolved contactList");
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
		//resolve(err.message);
        console.log(err.message);
    }
});
}

function showName()
{
	userId = sessionStorage.getItem('userId');
	userFirstName = sessionStorage.getItem('userFirstName');
	userLastName = sessionStorage.getItem('userLastName');
	console.log("loading name " + userFirstName + " " + userLastName);
	document.getElementById("title").innerHTML = "Welcome to Chomper's Phone Book, " + userFirstName + " " + userLastName;
}