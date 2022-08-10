
var idProduct = getUrlParam("id")
//console.log(idProduct);

fetchProduct();

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
		if(product) {
			renderProductPage(product);
		}
	})
	.catch(function(err) {
		console.log("Erreur de la requête API , Veuillez vérifier que le serveur est bien en ligne ou bien  contacté nous pour autre soucis ");
		console.log(err);
	});
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
cartBtn.addEventListener('click', function() {
	const colorPicked = document.getElementById("colors");
	const quantityPicked = document.getElementById("quantity");

	let cartItem = {
		id : idProduct,
		quantity : quantityPicked.value,
		color : colorPicked.value,
	}

	let cartLocalStorage = localStorage.getItem("cart");
	let cart = [];
	if(cartLocalStorage != null) {
		cart = JSON.parse(cartLocalStorage);
	}
	if (
		cartItem.quantity < 1 ||
		cartItem.color === ""
	) {
		alert("Pour validez votre article, veuillez indiquer une couleur et|ou une quantité")
	}
	else {

		let index = cart.findIndex(item => (cartItem.id == item.id && cartItem.color == item.color));
		if(index != -1) {
			// Handling the case when the product is already in the cart
			cart[index].quantity = parseInt(cart[index].quantity) + parseInt(cartItem.quantity);
			localStorage.setItem("cart", JSON.stringify(cart));
		}
		else {
			// Handling the case when the product is not already in the cart
			cart.push(cartItem);
			localStorage.setItem("cart", JSON.stringify(cart));
		}

		// Informing / Redirecting the customer
		if(window.confirm("Produit ajouté dans le panier, voulez-vous aller sur la page panier ?")) {
			window.location.href = "cart.html";
		}
	}
});