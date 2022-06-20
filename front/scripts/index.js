fetch("http://localhost:3000/api/products")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
}
)
.then(function(value){
  let products  = value;
  console.log(products);
  // Looping on products array
  for(const product of products) {
    console.log(product);
    // Generating HTML for each product

  const tagA = document.createElement("a");
  tagA.setAttribute("href" , "toto");
  elt.appendChild(newElt);
  console.log(product.altTxt);
  console.log(product.name);
  console.log(product.description);
  console.log(product.price);
}

//Finding the global container #items
let tagItems = document.getElementById('items');

//Creating <a> element
let tagA = document.createElement("a");
tagA.setAttribute("href" , "product.html?id="+product._id);
tagA.setAttribute("href" , "product.html?id=$(product._id");
tagA.textContent = product.name;
tagItems.appendChild(tagA);


//Creating <article> element
let tagArticle = document.createElement("article");
tagArticle.setAttribute(tagArticle);

//Creating <img> element 
let tagImg = document.createElement("img");
tagImg.setAttribute("src", `${product.image}`);
tagImg.setAttribute("alt" , `${product.textAlt}`);

//Creating <h3> element 
let tagH = document.createElement("h3");
tagH.appendChild(tagH);

//Creating <p> element
let tagP = document.createElement("p");
tagP.appendChild(tagP);

})

