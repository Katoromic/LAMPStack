const urlBase = '138.197.67.189';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

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

	let tmp = {login:login,password:password};
//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	console.log("jsonPayload= " + jsonPayload);
	
	let url = 'http://' + urlBase + '/LAMPAPI/Login.' + extension;
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
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
				userId = jsonObject.id;
	
				window.location.href = "landing.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
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

	if (firstName === "")
	{
		document.getElementById("registerFirstName").className = "ele required";
		document.getElementById("registerResult").innerHTML = "Please fill out all fields";
		return;
	}
	if (lastName === "")
	{
		document.getElementById("registerLastName").className = "ele required";
		document.getElementById("registerResult").innerHTML = "Please fill out all fields";
		return;
	}
	if (login === "")
	{
		document.getElementById("registerLogin").className = "ele required";
		document.getElementById("registerResult").innerHTML = "Please fill out all fields";
		return;
	}
	if (password === "")
	{
		document.getElementById("registerPassword").className = "ele required";
		document.getElementById("registerResult").innerHTML = "Please fill out all fields";
		return;
	}
	

	// resets fields
	userId = 0;
	firstName = "";
	lastName = "";
	document.getElementById("registerResult").innerHTML = "";

	// create json payload
	let tmp = {login:login,password:password,firstName:firstName,lastName:lastName};
	let jsonPayload = JSON.stringify( tmp );
	console.log("jsonPayload= " + jsonPayload);
	
	let url = 'http://' + urlBase + '/LAMPAPI/Register.' + extension;

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

// display contacts

function displayContacts()
{
	// get all contacts A-Z
	for (let i=0; i<letters.length; i++)
	{
		searchContact(letters[i], "firstName", contactList);
	}

	// display loop
	let displayBox = document.getElementsByTagName("p")[0].innerHTML;
	for (let i=0; i<contactList.length; i++)
	{
		displayBox.innerHTML += contactList[i].firstName + " " + contactList[i].lastName + 
								contactList[i].phone + " " + contactList[i].email + "<br>";
	}
}

function addContact()
{
	let firstName = document.getElementById("contactFirst").value;
	let lastName = document.getElementById("contactLast").value;
	let phone = document.getElementById("contactPhone").value;
	let email = document.getElementById("contactEmail").value;
	//document.getElementById("contactAddResult").innerHTML = "";

	let tmp = {firstName:firstName,lastName:lastName,phone:phone,email:email,userId:userId};
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

function editContact(id)
{
	let field = document.getElementById("field").value;
	let newValue = document.getElementById("newValue").value;
	document.getElementById("contactEditResult").innerHTML = "";

	let tmp = {contactId:id,fieldToUpdate:field,newValue:newValue};
	let jsonPayload = JSON.stringify( tmp );
	console.log("jsonPayload= " + jsonPayload);

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
				document.getElementById("contactEditResult").innerHTML = "Contact has been edited successfully";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactEditResult").innerHTML = err.message;
	}
}

// delete contact function

function searchContactClicked()
{
	let field = document.getElementById("searchText").value;
	// collect values from form
	let searchFirstName = document.getElementById("searchFirstName").value;
	let searchLastName = document.getElementById("searchLastName").value;
	let searchEmail = document.getElementById("searchEmail").value;
	let searchPhone = document.getElementById("searchPhone").value;

	if (searchFirstName !== "")
	{
		searchContact(searchFirstName, "FirstName", contactSearchList);
	}
	if (searchLastName !== "")
	{
		searchContact(searchLastName, "LastName", contactSearchList);
	}
	if (searchEmail !== "")
	{
		searchContact(searchEmail, "Email", contactSearchList);
	}
	if (searchPhone !== "")
	{
		searchContact(searchPhone, "Phone", contactSearchList);
	}

	// display loop
	let displayBox = document.getElementsByTagName("p")[0].innerHTML;
	for (let i=0; i<contactSearchList.length; i++)
	{
		displayBox.innerHTML += contactSearchList[i].firstName + " " + contactSearchList[i].lastName + 
								contactSearchList[i].phone + " " + contactSearchList[i].email + "<br>";
	}
	

}

// change function to searchContact
function searchContact(param, field, list)
{
	//document.getElementById("contactSearchResult").innerHTML = "";

	let tmp = {searchParam:param,searchField:field};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/LAMPAPI/SearchContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					list += jsonObject.contacts[i];
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}