var url = new URL(window.location.href);
var idProduct = url.searchParams.get("id");
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
	productName.innerHTML = product.name;

	// Changing the price
	let productPrice = document.getElementById('price');
	productPrice.innerHTML = product.price;

	// Changing the description 
	let productDescription = document.getElementById('description');
	productDescription.innerHTML = product.description;

	// Creating color
	for(let colors of product.colors) {
		let productColors = document.createElement("option");
		productColors.value = colors;
		productColors.innerHTML = colors;
		document.getElementById("colors").appendChild(productColors);
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
	}else{
	cart.push(cartItem);
	localStorage.setItem("cart", JSON.stringify(cart));
	//console.table(cartLocalStorage);

	alert('Ajout dans le panier');
	//window.location.href = "cart.html";

	for (let choix of cartItem)
    if ( idProduct === cartItem.id ||
		color === cartItem.color
		){
			cartItem.quantity = cartItem.quantity + 2; 
		}else{
			cartItem.quantiy = cartItem.quantity;
		}
}	


});