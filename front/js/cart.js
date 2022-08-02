let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

let productsCount = 0;
let productsAmount = 0;

// Looping on cart items
for (let cartItem of cartLocalStorage) {
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
		document.querySelector("#cart__items").appendChild(productArticle);
		productArticle.className = "cart__item";
		productArticle.setAttribute('data-id', product._id);

		// Creating "div"
		let productDivImg = document.createElement("div");
		productArticle.appendChild(productDivImg);
		productDivImg.className = "cart__item__img";

		// Creating img
		let productImg = document.createElement("img");
		productDivImg.appendChild(productImg);
		productImg.src = product.imageUrl;
		productImg.alt = product.altTxt;

		// Creating "div"
		let productItemContent = document.createElement("div");
		productArticle.appendChild(productItemContent);
		productItemContent.className = "cart__item__content";

		// "Creating div"
		let productItemContentTitlePrice = document.createElement("div");
		productItemContent.appendChild(productItemContentTitlePrice);
		productItemContentTitlePrice.className = "cart__item__content__titlePrice";

		// Creating "H2"
		let productTitle = document.createElement("h2");
		productItemContentTitlePrice.appendChild(productTitle);
		productTitle.textContent = product.name;

		// Creating the color
		let productColor = document.createElement("p");
		productTitle.appendChild(productColor);
		productColor.textContent = cartItem.color;
		productColor.style.fontSize = "20px";

		// Creating the price
		let productPrice = document.createElement("p");
		productItemContentTitlePrice.appendChild(productPrice);
		productPrice.textContent = product.price + " €";

		// Creating "div"
		let productItemContentSettings = document.createElement("div");
		productItemContent.appendChild(productItemContentSettings);
		productItemContentSettings.className = "cart__item__content__settings";

		// Creating "div"
		let productItemContentSettingsQuantity = document.createElement("div");
		productItemContentSettings.appendChild(productItemContentSettingsQuantity);
		productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

		// Creating the quantity
		let productQte = document.createElement("p");
		productItemContentSettingsQuantity.appendChild(productQte);
		productQte.textContent = "Qté : ";

		// Creating the quantity part2
		let productQuantity = document.createElement("input");
		productItemContentSettingsQuantity.appendChild(productQuantity);
		productQuantity.value = cartItem.quantity;
		productQuantity.className = "itemQuantity";
		productQuantity.setAttribute("type", "number");
		productQuantity.setAttribute("min", "1");
		productQuantity.setAttribute("max", "100");
		productQuantity.setAttribute("name", "itemQuantity");

		// Creating div
		let productItemContentSettingsDelete = document.createElement("div");
		productItemContentSettings.appendChild(productItemContentSettingsDelete);
		productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

		// Creating delete "p"
		let productSupprimer = document.createElement("p");
		productItemContentSettingsDelete.appendChild(productSupprimer);
		productSupprimer.className = "deleteItem";
		productSupprimer.textContent = "Supprimer";

		// Deleting the product from LocalStorage
		productSupprimer.addEventListener("click" , (event) => {
			event.preventDefault();
			let index = cartLocalStorage.findIndex(item => (cartItem.id == item.id && cartItem.color == item.color));
			if(index != -1) {
				cartLocalStorage.splice(index, 1);
				localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
				window.location.reload();
			}
		});

		// Updating the product quantity in LocalStorage
		productQuantity.addEventListener("change" , (event) => {
			event.preventDefault();
			let index = cartLocalStorage.findIndex(item => (cartItem.id == item.id && cartItem.color == item.color));
			if(index != -1) {
				cartLocalStorage[index].quantity = productQuantity.value;
				localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
				window.location.reload();
			}
		});

		// Getting the total of articles
		productsCount = productsCount + parseInt(productQuantity.value);
		document.getElementById('totalQuantity').textContent = productsCount;
		productsAmount = productsAmount + (parseInt(productQuantity.value) * product.price);
		document.getElementById('totalPrice').textContent = productsAmount;
	}
)}



// Sending customer informations and products IDs to backend API

// Listening the cart
const btnSend = document.getElementById("order");
btnSend.addEventListener("click", (event) => {
	event.preventDefault();
	// Validating customer form inputs
	if(validateForm()) {
		// Sending form
		sendForm();
	}
});

function validateForm() {
	let validation = true;

	/*
			let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
			let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
			let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
	*/

	// Testing firstName
	let firstNameInput = document.getElementById('firstName');
	let firstNameError = document.getElementById('firstNameErrorMsg');
	let firstNameRegex = new RegExp("^[a-zA-Z ,.'-]+$");
	if(firstNameRegex.test(firstNameInput.value)) {
		firstNameError.textContent = "";
	}
	else {
		firstNameError.textContent = "firstName is invalid";
		validation = false;
	}

	// Testing lastName
	//document.getElementById('lastName')
	// @todo

	// Testing address
	//document.getElementById('address')
	// @todo

	// Testing city
	//document.getElementById('city')
	// @todo

	// Testing email
	//document.getElementById('email')
	// @todo

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
	for(let cartItem of cartLocalStorage) {
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