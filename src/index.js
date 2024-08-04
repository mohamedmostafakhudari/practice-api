import "./style.css";
import { fetchHeadLine } from "./api.js";
import defaultNewsCardImage from "./assets/default-news-card-image.jpeg";

const navItemsCont = document.querySelector("nav .nav-items");
const cardsCont = document.querySelector("main .cards");
const navContactLink = document.querySelector("nav #nav-contact");
const contactSection = document.querySelector("section#contact");
const contactForm = document.querySelector("form#contactForm");

const countryCode = "us";

const headlines = [
	{
		country: "us",
		category: "science",
	},
	{
		country: "us",
		category: "sports",
	},
	{
		country: "us",
		category: "technology",
	},
];

class DOM {
	static renderNavItems() {
		navItemsCont.innerHTML = "";
		for (const { category } of headlines) {
			const item = DOM.createNavItem({ category });
			navItemsCont.appendChild(item);
		}
	}
	static createNavItem({ category }) {
		const li = document.createElement("li");
		li.className = "group";
		li.innerHTML = `
			<a href="/${category}" class="block text-lg capitalize py-6 w-32 text-center group-[&:not(:last-child)]:border-r">${category}</a>
		`;
		return li;
	}
	static async renderCards({ category }) {
		cardsCont.innerHTML = "";
		DOM.showCards();
		const data = await fetchHeadLine({ countryCode: countryCode, category });
		const articles = data.articles;

		for (const article of articles) {
			if (article.title === "[Removed]") continue;
			const card = DOM.createCard(article);
			cardsCont.appendChild(card);
		}
	}
	static createCard(article) {
		const { author, title, publishedAt, source, url, urlToImage } = article;

		const div = document.createElement("div");
		div.className = `shadow shadow-black/20 rounded-lg`;
		div.innerHTML = `
			<div class="w-full p-8">
				<img src="${urlToImage ? urlToImage : defaultNewsCardImage}" class="w-full object-cover object-center" />
			</div>
			<div class="px-8 pb-10">
				<h3 class="text-2xl font-bold">${title}</h3>
				<div class="mt-3">
					${author ? `<div><span class="font-bold">author :</span> ${author}</div>` : ""}
					${publishedAt ? `<div><span class="font-bold">published at :</span> ${publishedAt}</div>` : ""}
				</div>
				${source && url ? `<p class="mt-8">Read More At <a href="${url}" class="text-blue-600 font-bold">${source.name}</a></p>` : ""}
				
			</div>
		`;
		return div;
	}
	static showForm() {
		contactSection.style.display = "grid";
		cardsCont.style.display = "none";
	}
	static showCards() {
		cardsCont.style.display = "grid";
		contactSection.style.display = "none";
	}
}

DOM.renderNavItems();

navItemsCont.addEventListener("click", (e) => {
	const target = e.target.closest("a");
	if (!target) return;
	e.preventDefault();
	const category = target.getAttribute("href").match(/^\/(\w+)/)[1];
	DOM.renderCards({ category });
});

DOM.renderCards({ category: "technology" });

navContactLink.addEventListener("click", (e) => {
	e.preventDefault();
	DOM.showForm();
});

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
			console.log("Success");
		},
		(err) => {
			console.log(`FAILED... ${err.status}`);
		}
	);
});
