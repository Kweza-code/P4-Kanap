let params = new URL(document.location).searchParams;
let id = params.get("id");

// on récupérere le produit

function getArticle(){
    fetch("http://localhost:3000/api/products/${id}")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    }
    )