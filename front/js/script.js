// Get products data in array from API  
fetch("http://localhost:3000/api/products")
.then(function(res) {
	if (res.ok) {
		return res.json();
	}
})
.then(function(value) {

	let products = value;
	//console.log(products);

	// Looping on products array
	for(const product of products) {

		// Generating HTML for each product
		const tagItems = document.getElementById("items");

		// Creating <a> element
		const tagLink = document.createElement("a");
		tagLink.setAttribute('href', `product.html?id=${product._id}`);
		tagItems.appendChild(tagLink);

		// Creating <article> element
		const tagArticle = document.createElement("article");
		tagLink.appendChild(tagArticle);

		// Creating <img> element
		const tagImg = document.createElement("img");
		tagImg.setAttribute('src', product.imageUrl);
		tagImg.setAttribute('alt', product.altTxt);
		tagArticle.appendChild(tagImg);

		// Creating <h3> element
		const tagTitle = document.createElement("h3");
		tagTitle.setAttribute('class', 'productName');
		tagTitle.innerText = product.name;
		tagArticle.appendChild(tagTitle);

		// Creating <p> element
		const tagText = document.createElement("p");
		tagText.setAttribute('class', 'productDescription');
		tagText.innerText = product.description;
		tagArticle.appendChild(tagText);
	}
})
.catch(function(err) {
	console.log("Erreur de la requête API , Veuillez vérifier que le serveur est bien en ligne ou bien  contacté nous pour autre soucis ");
	console.log(err);
});