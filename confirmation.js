// Fonction de calcul du nombre d'articles dans le panier
function CalculNombreArticlesPanier(panier) {
  let quantite = 0;
  for (i in panier) {
    quantite += panier[i];
  }
  return quantite;
}

// Fonction d'affichage du nombre d'articles sur l'icône de panier dans le header
function AffichageIconePanier(pan) {
  let chiffreIconePanier = document.getElementById("nombreArticlesPanier");
  // si le panier n'existe pas, afficher 0
  if (pan === null) {
    chiffreIconePanier.innerHTML = 0;
  } else {
    // sinon, afficher le nombre d'articles
    chiffreIconePanier.innerHTML = CalculNombreArticlesPanier(pan);
  }
}

// Fonction d'affichage du message de confirmation de commande
function AffichageMessage() {
  let zoneAffichageMessage = document.getElementById("affichageMessage");

  // on récupère les données de la réponse du serveur enregistrées dans le local storage
  let data = JSON.parse(localStorage.getItem("ReponseServeur"));

  // on affiche le message
  zoneAffichageMessage.innerHTML = `<h2 class="alert-heading">Félicitations !</h2>
  <p>Nous vous remercions pour votre commande n° ${data.orderId} de :
  <ul id="produitsCommande">
  </ul>
  Pour la somme de ${localStorage.getItem("SommeTotale")} €
  </p>
  <hr>
  <p> Ces articles seront adressés à:</p>
  <p> ${data.contact.firstName} ${data.contact.lastName}<br>
  ${data.contact.address} ${data.contact.city}</p>
  <p>Vous recevrez sous peu une confirmation à l'adresse mail : ${
    data.contact.email
  }</p>`;
  let zoneAffichageProduits = document.getElementById("produitsCommande");
  for (const produit in data.products) {
    zoneAffichageProduits.innerHTML += `<li>${
      panier[data.products[produit]._id]
    } x "${data.products[produit].name}"</li>`;
  }
}

// CODE PRINCIPAL //
let panier = JSON.parse(localStorage.getItem("Panier"));
if (panier != null) {
  produitsPanier = Object.keys(panier);

  AffichageMessage();

  localStorage.removeItem("Panier");
  localStorage.removeItem("ReponseServeur");
  localStorage.removeItem("SommeTotale");
  localStorage.removeItem("ObjetContact");
}
AffichageIconePanier();
