var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);


const colorPicked = document.getElementById("colors")
const quantityPicked = document.getElementById("quantity")

getArticle();

// Récupération des articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API , Veuillez vérifier que le serveur est bien en ligne ou contacté nous");
		
    })
}
    
function getPost(article){
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.getElementById("colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);


    //Gestion du panier 

    function addToCart(article) {
    const btn_Panier = document.getElementById("addToCart")
    }

 // listening event "click" on addToCart

 
  

// local storage //
let myCart = {
    id: idProduct,
    color: colorPicked,
    quantity: quantityPicked, 
}

localStorage.setIteem("produit",JSON.stringify(myCart));
let produit = JSON.parse(localStorage.getItem(`produit`));}