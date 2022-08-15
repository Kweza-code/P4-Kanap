
function getUrlParam(paramName = "")
{
	var url = new URL(window.location.href);
	var result = url.searchParams.get(paramName);
	return result;
}

function getCart() {
	let cartLocalStorage = localStorage.getItem("cart");
	let cart = [];
	if(cartLocalStorage != null) {
		cart = JSON.parse(cartLocalStorage);
	}
	return cart;
}

function saveCart(cart = []) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

function findProductFromCart(productId = '', productColor = '') {
	let index = cart.findIndex(item => (productId == item.id && productColor == item.color));
	return index;
}

function deleteProductToCart(productId = '', productColor = '') {

}

function updateProductQuantityFromCart(productId = '', productColor = '', quantity = 0) {

}

function addProductToCart(productId = '', productColor = '', quantity = 0) {
	let cart = getCart();
	let index = findProductFromCart(productId, productColor);
	if(index != -1) {
		// Handling the case when the product is already in the cart
		cart[index].quantity = parseInt(cart[index].quantity) + parseInt(quantity);
		saveCart(cart);
	}
	else {
		// Handling the case when the product is not already in the cart
		let cartItem = {
			id : productId,
			quantity : quantity,
			color : productColor,
		}
		cart.push(cartItem);
		saveCart(cart);
	}
	return true;
}

