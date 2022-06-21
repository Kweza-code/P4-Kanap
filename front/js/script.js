// Get products data in array from API  
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
 
    
 // Generating HTML for each product
const tagItems = document.getElementById("items");
document.querySelector(".products").appendChild(tagItems);
tagItems.classList.add("product")



//Creating <a> element
let tagLink = document.createElement("a");
tagItems.appendChild(tagLink);
tagLink.href = `product.html?id=${resultatAPI[article]._id}`;
tagLink.classList.add("streched-link");

//Creating <img> element 
let tagImg = document.createElement("img");
tagLink.appendChild(tagImg);
tagImg.classListadd("product.img")

//Creating <article> element
let tagArticle = document.createElement("article");
tagImg.appendChild(tagArticle);


//Creating <h3> element 
let tagTitle = document.createElement("h3");
tagArticle.appendChild(tagTitle);
tagTitle.classList.add("product.Title")

//Creating <p> element
let tagText = document.createElement("p");
tagArticle.appendChild(tagText);
tagText.classList.add("product.info")

//Creating InfoPrice

let tagPrice = document.createElement("div")
tagText.appendChild(tagPrice)
tagPrice.classList.add("product.price")
})

// even click 

