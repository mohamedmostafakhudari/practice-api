import { fetchHeadLine } from "./api.js";
import defaultNewsCardImage from "./assets/default-news-card-image.jpeg";

export default class DOM {
	static renderNavItems() {
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

		const nav = this.createNavbar({ headlines });
		document.querySelector("#navbar-placeholder").replaceWith(nav);
	}
	static createNavbar({ headlines }) {
		const nav = document.createElement("nav");
		nav.className = "bg-blue-500 text-white fixed top-0 inset-x-0";
		nav.innerHTML = `
		<div class="container flex items-center justify-between">
					<div>
						<a
							href="./"
							class="logo block py-6 px-8 text-3xl"
							>Logo</a
						>
					</div>
					<div class="flex items-center">
						<ul class="nav-items flex items-center">
							<!-- nav items will go here -->
						</ul>
						<div>
							<a
								id="nav-contact"
								href="./contact.html"
								class="capitalize block py-6 text-lg px-3 ml-8"
								>contact us</a
							>
						</div>
					</div>
				</div>
		`;
		const navItemsList = nav.querySelector(".nav-items");

		if (navItemsList) {
			for (const { category } of headlines) {
				const item = DOM.createNavItem({ category });
				navItemsList.appendChild(item);
			}
		}
		return nav;
	}
	static createNavItem({ category }) {
		const li = document.createElement("li");
		li.className = "group";
		li.innerHTML = `
			<a href="./${category}" class="block text-lg capitalize py-6 w-32 text-center group-[&:not(:last-child)]:border-r">${category}</a>
		`;
		return li;
	}
	static async renderCards({ category }) {
		const cardsCont = document.querySelector("main .cards");
		const countryCode = "us";

		cardsCont.innerHTML = "";
		const data = await fetchHeadLine({ countryCode: countryCode, category });
		const articles = data.articles;

		for (const article of articles) {
			if (article.title === "[Removed]") continue;
			const card = DOM.createCard(article);
			cardsCont.appendChild(card);
		}
	}
	static createCard(article) {
		const { author, title, description, publishedAt, source, url, urlToImage } = article;
		const div = document.createElement("div");
		div.className = `shadow shadow-black/20 rounded-lg flex flex-col`;
		div.innerHTML = `
			<div class="w-full p-8">
				<img src="${urlToImage ? urlToImage : defaultNewsCardImage}" class="w-full object-cover object-center" />
			</div>
			<div class="px-8 pb-10 flex flex-col flex-1">
				<div class="flex-1">
					<h3 class="text-2xl font-bold">${title}</h3>
					<div class="mt-3">
						${author ? `<div><span class="font-bold">author :</span> ${author}</div>` : ""}
						${publishedAt ? `<div><span class="font-bold">published at :</span> ${publishedAt}</div>` : ""}
					</div>
				</div>
				<div class="flex items-center justify-center gap-12 mt-8">
				<a href="./details.html?author=${author}&title=${title}&description=${description}&publishedAt=${publishedAt}&urlToImage=${urlToImage}" class="block bg-blue-500 text-white capitalize font-bold text-lg p-3 px-5 rounded">details</a>
				${source && url ? `<p class="text-center">Read More At<br /> <a href="${url}" target="_blank" class="text-blue-600 font-bold">${source.name}</a></p>` : ""}
				</div>
				
			</div>
		`;
		return div;
	}
	static renderNewsDetails(details) {
		const { author, title, desc, publishedAt, imageUrl } = details;
		const newsDetailsCont = document.querySelector(".news-details-container");
		newsDetailsCont.innerHTML = `
		<figure class="w-[800px] shadow shadow-black/20 rounded-lg overflow-hidden">
			<img src=${imageUrl} class="w-full object-cover object-center"/>
			<figcaption class="flex items-center justify-start gap-6 bg-zinc-800/80 text-white py-2 px-6">
				<div>author : <span class="text-orange-400 font-bold">${author}</span></div>
				<div>publishedAt : <span class="text-orange-400 font-bold">${publishedAt}</span></div>
			</figcaption>
		</figure>
		<div class="space-y-4">
			<h2 class="text-4xl font-bold font-serif">${title}</h2>
			<p>${desc}</p>		
		</div>
		`;
	}
	static showEmailSuccessDialog() {
		const dialog = document.querySelector("#success-dialog");
		dialog.showModal();
		dialog.classList.add("animate-scale-up");
	}
	static closeEmailSuccessDialog() {
		const dialog = document.querySelector("#success-dialog");
		dialog.classList.remove("animate-scale-up");
		dialog.classList.add("animate-scale-down");
		dialog.onanimationend = () => {
			dialog.close();
			dialog.classList.remove("animate-scale-down");
		};
	}
	static clearInputs(form) {
		const inputs = form.querySelectorAll("input,textarea");
		inputs.forEach((input) => {
			input.value = "";
		});
	}
}
