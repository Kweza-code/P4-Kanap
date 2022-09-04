//confirmation.html?orderId=1663d8b0-0d15-11ed-a5ac-01481f4c9884
var orderId = getUrlParam("orderId")
//console.log(orderId);

if(orderId === null || orderId === '' || orderId === undefined) {
	document.querySelector('.confirmation p').textContent = "Impossible d'afficher la page";
}
else {
	const orderIdSpan = document.getElementById('orderId');
	orderIdSpan.textContent = orderId;
	saveCart([]);
}
