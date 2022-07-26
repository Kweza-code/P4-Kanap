let copyOfLS = JSON.parse(localStorage.getItem("products"));

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
		productTitle.innerHTML = product.name;

		// Creating the color
		let productColor = document.createElement("p");
		productTitle.appendChild(productColor);
		productColor.innerHTML = cartItem.color;
		productColor.style.fontSize = "20px";

		// Creating the price
		let productPrice = document.createElement("p");
		productItemContentTitlePrice.appendChild(productPrice);
		productPrice.innerHTML = product.price + " €";

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
		productQte.innerHTML = "Qté : ";

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
		productSupprimer.innerHTML = "Supprimer";

		// Deleting the product from LocalStorage
		productSupprimer.addEventListener("click" , (event) => {
			event.preventDefault();
			let key = cartLocalStorage.findIndex(item => (cartItem.id == item.id && cartItem.color == item.color));
			if(key != -1) {
				cartLocalStorage.splice(key, 1);
				localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
				window.location.reload();
			}
		});

		// Updating the product quantity in LocalStorage
		productQuantity.addEventListener("change" , (event) => {
			event.preventDefault();
			let key = cartLocalStorage.findIndex(item => (cartItem.id == item.id && cartItem.color == item.color));
			if(key != -1) {
				cartLocalStorage[key].quantity = productQuantity.value;
				localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
				window.location.reload();
			}
		});

		// Getting the total of articles
		productsCount = productsCount + parseInt(productQuantity.value);
		document.getElementById('totalQuantity').innerHTML = productsCount;
		productsAmount = productsAmount + (parseInt(productQuantity.value) * product.price);
		document.getElementById('totalPrice').innerHTML = productsAmount;
	}	
)}


//Creating Regex
function getForm() {
	let info = document.querySelector("cart_order_form");

	let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

}
 // Ecoute de la modification du prénom
 form.firstName.addEventListener('change', function() {
	validFirstName(this);
});

// Ecoute de la modification du prénom
form.lastName.addEventListener('change', function() {
	validLastName(this);
});

// Ecoute de la modification du prénom
form.address.addEventListener('change', function() {
	validAddress(this);
});

// Ecoute de la modification du prénom
form.city.addEventListener('change', function() {
	validCity(this);
});

// Ecoute de la modification du prénom
form.email.addEventListener('change', function() {
	validEmail(this);
});

//validation du prénom
const validFirstName = function(inputFirstName) {
	let firstNameErrorMsg = inputFirstName.nextElementSibling;

	if (charRegExp.test(inputFirstName.value)) {
		firstNameErrorMsg.innerHTML = '';
	} else {
		firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
	}
};

//validation du nom
const validLastName = function(inputLastName) {
	let lastNameErrorMsg = inputLastName.nextElementSibling;

	if (charRegExp.test(inputLastName.value)) {
		lastNameErrorMsg.innerHTML = '';
	} else {
		lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
	}
};

//validation de l'adresse
const validAddress = function(inputAddress) {
	let addressErrorMsg = inputAddress.nextElementSibling;

	if (addressRegExp.test(inputAddress.value)) {
		addressErrorMsg.innerHTML = '';
	} else {
		addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
	}
};

//validation de la ville
const validCity = function(inputCity) {
	let cityErrorMsg = inputCity.nextElementSibling;

	if (charRegExp.test(inputCity.value)) {
		cityErrorMsg.innerHTML = '';
	} else {
		cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
	}
};

//validation de l'email
const validEmail = function(inputEmail) {
	let emailErrorMsg = inputEmail.nextElementSibling;

	if (emailRegExp.test(inputEmail.value)) {
		emailErrorMsg.innerHTML = '';
	} else {
		emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
	}
};

getForm();

//Sending information of the client at the LocalStorage

function form(){
	const btn_send = document.getElementById("order");

	//Listening the cart
	btn_send.addEventListener("click", (event)=>{
		
		//getting the information of the client from the form
		let information = {
			firstName: document.querySelector("#firstName"),
			lastName: document.querySelector("#lastName"),
			address: document.querySelector("#address"),
			city: document.querySelector("#city"),
			email: document.querySelector("#email"),
	    };
		console.log(information);

		//creation du tableau de Product id ?????
		let productId = [];
		productsBought.push(copyOfLS);	
	    

   const order = {
	    contact : {
			firstName: inputName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
		 },
		 products: productsBought,
	};
// creating the request 
	const options = {
		method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json', 
            "Content-Type": "application/json" 
            },
        };


		fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
		})
        .catch((err) => {
            alert ("Problem with the fetch  : " + err.message);
        });
	   })
}
form();