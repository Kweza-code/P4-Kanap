//confirmation.html?orderId=1663d8b0-0d15-11ed-a5ac-01481f4c9884

var url = new URL(window.location.href);
var orderId = url.searchParams.get("orderId");
console.log(orderId);

let orderIdSpan = document.getElementById('orderId');
orderIdSpan.textContent = orderId;
