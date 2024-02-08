const dummyContacts = [
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "Jane",
	  lastName: "Smith",
	  email: "jane@example.com",
	  number: "987654321",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	{
	  firstName: "John",
	  lastName: "Doe",
	  email: "john@example.com",
	  number: "123456789",
	},
	// Add more contacts as needed
];

let currentIndex = 0;

// Function to create a contact element
function createContactElement(contact) {
  const contactElement = document.createElement("div");
  contactElement.classList.add("row");

  contactElement.innerHTML = `
	<div class="contact-list-box">
	  <div class="column">
		<div class="contact-info">First Name: ${contact.firstName || ''}</div>
	  </div>
	  <div class="column">
		<div class="contact-info">Last Name: ${contact.lastName || ''}</div>
	  </div>
	  <div class="column">
		<div class="contact-info">Email: ${contact.email || ''}</div>
	  </div>
	  <div class="column">
		<div class="contact-info">Number: ${contact.number || ''}</div>
	  </div>
	  <div class="column">
		<div class="modify-button-box">
		  <button class="modify-button" onclick="deleteContact()">delete</button>
		  <button class="modify-button" onclick="editContact()">Edit</button>
		</div>
	  </div>
	</div>
  `;

  return contactElement;
}

// Function to clear previously added HTML
function clearContactList() {
	const contactContainer = document.getElementById("contactContainer");
	contactContainer.innerHTML = `<div class="info-contact-box" id="contactContainer"></div>';` // Clear the content
	currentIndex = 0; // Reset the index for dummy data
}

document.addEventListener("DOMContentLoaded", function() {
  const scrollingWindow = document.getElementById("scrollingWindow");

  // Function to add more content when scrolling near the bottom
  function loadMoreContent() {
	const scrollPercentage = (scrollingWindow.scrollTop + scrollingWindow.clientHeight) / scrollingWindow.scrollHeight;

	if (scrollPercentage > 0.8) {
	  // Load more content here using createContactElement
	  if (currentIndex < contactList.length) {
		const contact = contactList[currentIndex++];
		const contactElement = createContactElement(contact);
		scrollingWindow.appendChild(contactElement);
	  }
	}
  }

  // Attach the loadMoreContent function to the scroll event
  scrollingWindow.addEventListener("scroll", loadMoreContent);
});

// Function to create a contact element
function createContactElement(contact) {
  const contactElement = document.createElement("div");
  contactElement.classList.add("row");

  contactElement.innerHTML = `
      <div class="contact-list-box">
        <div class="column">
          <div class="contact-info"> ${contact.FirstName || ""}</div>
        </div>
        <div class="column">
          <div class="contact-info"> ${contact.LastName || ""}</div>
        </div>
		<div class="column">
		  <div class="contact-info"> ${contact.Phone || ""}</div>
		</div>
        <div class="column">
          <div class="contact-info"> ${contact.Email || ""}</div>
        </div>
        <div class="column">
          <div class="modify-button-box">
            <button class="modify-button" onclick="deleteContact(${contact.ID})">Delete</button>
            <button class="modify-button" onclick="editContactClicked(${contact.ID})">Edit</button>
          </div>
        </div>
      </div>
    `;

  return contactElement;
}

// Function to handle intersection observer events
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadContacts(3); // Load 3 contacts when the target is in the viewport
    }
  });
}

// Function to load contacts dynamically
function loadContacts(count) {
  const contactContainer = document.getElementById("contactContainer");
  contactList = JSON.parse(sessionStorage.getItem('contactList'));

  for (let i = 0; i < count && currentIndex < contactList.length; i++) {
    const contact = contactList[currentIndex++];
    const contactElement = createContactElement(contact);
    contactContainer.appendChild(contactElement);
  }
}

// Initialize the Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5,
});
observer.observe(document.getElementById("contactContainer"));

// Initial load
contactList = [];
let contactString = sessionStorage.getItem('contactList');
contactList = JSON.parse(contactString);
loadContacts(6); // Load 3 contacts initially




  

  