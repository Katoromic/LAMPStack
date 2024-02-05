let contacts = document.querySelector(".contacts");
let viewer = document.querySelector(".color");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

contacts.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

viewer.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});
