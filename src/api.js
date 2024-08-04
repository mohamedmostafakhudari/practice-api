export async function fetchHeadLine({ countryCode, category }) {
	const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&apiKey=f53ad9b394b24e5d9690c0755bbfd089`);
	const data = await response.json();
	return data;
}
