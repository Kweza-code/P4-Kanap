let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

for (let cart in cartLocalStorage) {
    for (let produit in cartLocalStorage){
        // Creating "article"
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute('data-id', cartLocalStorage[produit].idProduit);
    
        // Creating "div"
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";
    
        // Creating img
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = cartLocalStorage[produit].imgProduit;
        productImg.alt = cartLocalStorage[produit].altImgProduit;
        
        // Creating "div"
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";
    
        // "Creating div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // Creating "H3"
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = cartLocalStorage[produit].nomProduit;
    
        // Creating the color
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = cartLocalStorage[produit].couleurProduit;
        productColor.style.fontSize = "20px";
    
        // Creating the price
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = cartLocalStorage[produit].prixProduit + " €";
    
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
        productQuantity.value = cartLocalStorage[produit].quantiteProduit;
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
    }
}


