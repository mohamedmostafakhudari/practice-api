import "/src/style.css";
import "/src/navbar.js";
import DOM from "/src/DOM.js";

const contactForm = document.querySelector("#contact form");
const closeDialogBtn = document.querySelector("button#close-success-dialog");

contactForm.addEventListener("submit", function (e) {
	e.preventDefault();
	//! A new thing to remember FormData Obj can't be console logged

	const formData = new FormData(this);
	const templateParams = {
		contact_number: formData.get("contact_number"),
		user_name: formData.get("user_name"),
		user_email: formData.get("user_email"),
		message: formData.get("message"),
		my_name: "mohamed mostafa",
		my_email: "mohamedmostafakhudari@gmail.com",
	};
	emailjs.send("contact_service", "contact_form", templateParams).then(
		() => {
			DOM.showEmailSuccessDialog();
			DOM.clearInputs(contactForm);
		},
		(err) => {
			console.log(`FAILED... ${err.status}`);
		}
	);
});
closeDialogBtn.addEventListener("click", () => {
	DOM.closeEmailSuccessDialog();
});
