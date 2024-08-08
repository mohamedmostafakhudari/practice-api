import DOM from "./DOM.js";

DOM.renderNavItems();

const logo = document.querySelector(".logo");
const navItemsCont = document.querySelector("nav .nav-items");

logo.addEventListener("click", (e) => {
	e.preventDefault();
	console.log(process.env.BASE_URL, window.location.pathname);
	if (process.env.BASE_URL !== window.location.pathname) {
		window.location.href = "./";
	}

	DOM.renderCards({ category: "technology" });
});
navItemsCont.addEventListener("click", (e) => {
	const target = e.target.closest("a");
	if (!target) return;
	e.preventDefault();
	if (process.env.BASE_URL !== window.location.pathname) {
		window.location.href = "./";
	}
	const category = target.getAttribute("href").match(/^.\/(\w+)/)[1];
	DOM.renderCards({ category });
});
