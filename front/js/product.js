let idProduct = getUrlParam("id");
//console.log(idProduct);

if(idProduct === null || idProduct === '' || idProduct === undefined) {
	renderProductPageError();
}
else {
	fetchProduct();
}

// Get product data in array from API
function fetchProduct() {
	fetch("http://localhost:3000/api/products/" + idProduct)
	.then(function(res) {
		if(res.ok) {
			return res.json();
		}
	})
	.then(function(value) {
		let product = value;
		//console.log(product);
		renderProductPage(product);
	})
	.catch(function(err) {
		renderProductPageError();
		console.log("Erreur de la requête API , Veuillez vérifier que le serveur est bien en ligne ou bien  contacté nous pour autre soucis ");
		console.log(err);
	});
}

// Render the product page error
function renderProductPageError() {
	document.querySelector('.item article').textContent = "Impossible d'afficher la page";
}

// Render the product page
function renderProductPage(product) {
	// Creating "img"
	let productImg = document.createElement("img");
	document.querySelector(".item__img").appendChild(productImg);
	productImg.src = product.imageUrl;
	productImg.alt = product.altTxt;

	// Creating "H1"
	let productName = document.getElementById('title');
	productName.textContent = product.name;

	// Changing the price
	let productPrice = document.getElementById('price');
	productPrice.textContent = product.price;

	// Changing the description 
	let productDescription = document.getElementById('description');
	productDescription.textContent = product.description;

	// Creating color
	for(let color of product.colors) {
		let productColor = document.createElement("option");
		productColor.value = color;
		productColor.textContent = color;
		document.getElementById("colors").appendChild(productColor);
	}
}

// Listening 'click' on cart button
const cartBtn = document.getElementById("addToCart");
if(cartBtn !== null) {
	cartBtn.addEventListener('click', function(event) {
		const quantityPicked = document.getElementById("quantity").value;
		const colorPicked = document.getElementById("colors").value;
		let cart = getCart();
		if (
			quantityPicked < -1 ||
			colorPicked === ""
		) {
			alert("Pour validez votre article, veuillez indiquer une couleur et|ou une quantité")
		}
		else {
			addProductToCart(idProduct, colorPicked, quantityPicked);
			// Informing / Redirecting the customer
			if(window.confirm("Produit ajouté dans le panier, voulez-vous aller sur la page panier ?")) {
				window.location.href = "cart.html";
			}
		}
	});
}																				