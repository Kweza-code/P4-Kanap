let cart = getCart();

if(cart.length === 0) {
	let sectionCart = document.querySelector('.cart');
	htmlSectionCart.textContent = "Votre panier est vide";
	htmlSectionCart.style.cssText = 'text-align:center;';
}
else {
	let productsCount = 0;
	let productsAmount = 0;

	// Looping on cart items
	for (let cartItem of cart) {
		// Getting missing data from API
		fetch("http://localhost:3000/api/products/" + cartItem.id)
		.then(function(res) {
			if(res.ok) {
				return res.json();
			}
		})
		.then(function(value) {
			let product = value;

			//console.log(product);
			//console.log(cartItem.quantity);

			// Creating "article"
			let productArticle = document.createElement("article");
			productArticle.className = "cart__item";
			productArticle.setAttribute('data-id', product._id);
			document.querySelector("#cart__items").appendChild(productArticle);

			// Creating "div"
			let productDivImg = document.createElement("div");
			productDivImg.className = "cart__item__img";
			productArticle.appendChild(productDivImg);
			// Creating img
			let productImg = document.createElement("img");
			productImg.src = product.imageUrl;
			productImg.alt = product.altTxt;
			productDivImg.appendChild(productImg);
			// Creating "div"
			let productItemContent = document.createElement("div");
			productItemContent.className = "cart__item__content";
			productArticle.appendChild(productItemContent);

			// "Creating div"
			let productItemContentTitlePrice = document.createElement("div");
			productItemContentTitlePrice.className = "cart__item__content__titlePrice";
			productItemContent.appendChild(productItemContentTitlePrice);

			// Creating "H2"
			let productTitle = document.createElement("h2");
			productTitle.textContent = product.name;
			productItemContentTitlePrice.appendChild(productTitle);

			// Creating the color
			let productColor = document.createElement("p");
			productColor.textContent = cartItem.color;
			productColor.style.fontSize = "20px";
			productTitle.appendChild(productColor);

			// Creating the price
			let productPrice = document.createElement("p");
			productPrice.textContent = product.price + " €";
			productItemContentTitlePrice.appendChild(productPrice);
			
			// Creating "div"
			let productItemContentSettings = document.createElement("div");
			productItemContentSettings.className = "cart__item__content__settings";
            productItemContent.appendChild(productItemContentSettings);

			// Creating "div"
			let productItemContentSettingsQuantity = document.createElement("div");
			productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
			productItemContentSettings.appendChild(productItemContentSettingsQuantity);

			// Creating the quantity
			let productQte = document.createElement("p");
			productQte.textContent = "Qté : ";
			productItemContentSettingsQuantity.appendChild(productQte);

			// Creating the quantity part2
			let productQuantity = document.createElement("input");
			productQuantity.value = cartItem.quantity;
			productQuantity.className = "itemQuantity";
			productQuantity.setAttribute("type", "number");
			productQuantity.setAttribute("min", "1");
			productQuantity.setAttribute("max", "100");
			productQuantity.setAttribute("name", "itemQuantity");
			productItemContentSettingsQuantity.appendChild(productQte);

			// Creating div
			let productItemContentSettingsDelete = document.createElement("div");	
			productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
			productItemContentSettings.appendChild(productItemContentSettingsDelete);

			// Creating delete "p"
			let productSupprimer = document.createElement("p");
			productSupprimer.className = "deleteItem";
			productSupprimer.textContent = "Supprimer";
			productItemContentSettingsDelete.appendChild(productSupprimer);

			// Deleting the product from LocalStorage
			productSupprimer.addEventListener("click" , (event) => {
				event.preventDefault();
				deleteProductToCart(cartItem.id, cartItem.color);
				window.location.reload();
			});

			// Updating the product quantity in LocalStorage
			productQuantity.addEventListener("change" , (event) => {
				event.preventDefault();
				updateProductQuantityFromCart(cartItem.id, cartItem.color, productQuantity.value);
				window.location.reload();
			});

			// Getting the total of articles
			productsCount = productsCount + parseInt(productQuantity.value);
			document.getElementById('totalQuantity').textContent = productsCount;
			productsAmount = productsAmount + (parseInt(productQuantity.value) * product.price);
			document.getElementById('totalPrice').textContent = productsAmount;
		}
	)}
}

// Sending customer informations and products IDs to backend API

// Listening the cart
const btnSend = document.getElementById("order");
if(btnSend !== null) {
	btnSend.addEventListener('click', function(event) {
		event.preventDefault();
		// Validating customer form inputs
		if(validateForm()) {
			// Sending form
			sendForm();
		}
	});
}

function validateForm() {
	let validation = true;
	// Testing firstName
	let firstNameInput = document.getElementById('firstName');
	let firstNameError = document.getElementById('firstNameErrorMsg');
	let firstNameRegex = new RegExp("^[a-zA-Z ,'.àâäéèêëïîôöùûüç-]+$");
	if(firstNameRegex.test(firstNameInput.value)) {
		firstNameError.textContent = "";
	}
	else {
		firstNameError.textContent = "Le prénom est invalide";
		validation = false;
	}

	// Testing lastName
	let lastNameInput = document.getElementById('lastName')
	let lastNameError = document.getElementById('lastNameErrorMsg')
	let lastNameRegex = new RegExp("^[a-zA-Z ,.'àâäéèêëïîôöùûüç-]+$");
	if(lastNameRegex.test(lastNameInput.value)){
		lastNameError.textContent = "";
	}
	else{
		lastNameError.textContent = "Le nom est invalide";
		validation = false;
	}

	// Testing address
	let addressInput = document.getElementById('address');
	let addressError = document.getElementById('addressErrorMsg');
	let addressRegex = new RegExp("^[0-9]{0,4}[a-zA-Z ,.'àâäéèêëïîôöùûüç-]+$");
	if(addressRegex.test(addressInput.value)){
		addressError.textContent = "";
	}
	else{
		addressError.textContent = "L'adresse est invalide";
		validation = false;
	}

	// Testing city
	let cityInput = document.getElementById('city');
	let cityError = document.getElementById('cityErrorMsg');
	let cityRegex = new RegExp("^[a-zA-Z ,.'àâäéèêëïîôöùûüç-]+$");
	if(cityRegex.test(cityInput.value)){
		cityError.textContent = "";
	}
	else{
		cityError.textContent = "La ville est invalide";
		validation = false;
	}

	// Testing email
	let mailInput = document.getElementById('email');
	let mailError = document.getElementById('emailErrorMsg');
	let mailRegex = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$');
	if(mailRegex.test(mailInput.value)){
		mailError.textContent = "";
	}
	else{
		mailError.textContent = "L'email est invalide";
		validation = false;
	}

	return validation;
}

function sendForm() {
	// Getting form data
	let contactData = {
		firstName: document.querySelector("#firstName"),
		lastName: document.querySelector("#lastName"),
		address: document.querySelector("#address"),
		city: document.querySelector("#city"),
		email: document.querySelector("#email"),
	};
	//console.log(contactData);

	// Getting products IDs from cart
	let productsIds = [];
	for(let cartItem of cart) {
		productsIds.push(cartItem.id);
	}
	//console.log(productsIds);

	// Gathering data into order variable
	const order = {
		contact: contactData,
		products: productsIds,
	};
	//console.log(order);

	// Sending form to backend API (fetch)
	fetch("http://localhost:3000/api/products/order",
		{
			method: 'POST',
			body: JSON.stringify(order),
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		}
	)
	.then((response) => response.json())
	.then((value) => {
		let response = value;
		console.log(response);
		document.location.href = "confirmation.html?orderId="+response.orderId;
	})
	.catch((err) => {
		alert("Problem with the fetch  : " + err.message);
	});
}