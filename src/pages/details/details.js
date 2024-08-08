import "/src/style.css";
import "/src/navbar.js";
import DOM from "/src/DOM.js";
import defaultNewsCardImage from "/src/assets/default-news-card-image.jpeg";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const imageUrl = urlParams.get("urlToImage");
const defaultDesc = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet massa elementum, auctor justo at, auctor dolor. Maecenas pharetra, orci et tristique semper, erat dolor dapibus massa, non suscipit libero eros vitae felis. Duis id mauris fermentum ante eleifend laoreet in nec ante. Phasellus mattis tortor vitae augue rhoncus ultrices. Proin nec porta nisi, vel ullamcorper nisi. Donec volutpat tristique erat quis accumsan. Nam nec ligula tempor, fermentum odio id, rhoncus nisi. Mauris vestibulum in felis vel placerat. Fusce sit amet luctus turpis.
Phasellus malesuada imperdiet magna, vitae tincidunt est blandit ac. Vestibulum ac ex ultricies, egestas est sed, ornare nulla. Sed faucibus, enim vitae mattis laoreet, dui magna ultrices urna, sit amet consequat ligula elit eu ex. Praesent placerat vestibulum aliquam. Aliquam auctor ornare sem commodo dapibus. Aenean venenatis arcu eget nisi pellentesque, venenatis rhoncus dolor tempus. Donec lobortis faucibus nisl nec consequat. Proin vel posuere tortor, sed ullamcorper diam. Donec pulvinar ultrices tempor. Vestibulum ac feugiat nulla.
Aliquam efficitur nibh risus, in porta lacus malesuada eu. Maecenas interdum tempus nisi eu euismod. Aliquam nisl felis, rhoncus at ipsum at, tristique condimentum velit. Pellentesque ac efficitur est. Proin malesuada rhoncus nulla eget bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. In luctus, risus et volutpat tincidunt, ipsum ante hendrerit magna, ornare vulputate mi sem vel justo. Curabitur ut commodo felis, eu condimentum diam. In hac habitasse platea dictumst. Pellentesque ultrices porta eleifend.
`;
const details = {
	author: urlParams.get("author"),
	title: urlParams.get("title"),
	desc: urlParams.get("description") !== "null" ? urlParams.get("description") : defaultDesc,
	publishedAt: urlParams.get("publishedAt"),
	imageUrl: imageUrl !== "null" ? imageUrl : defaultNewsCardImage,
};

DOM.renderNewsDetails(details);
