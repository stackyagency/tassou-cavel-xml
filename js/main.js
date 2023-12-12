console.log("Main - JS");

let form = document.querySelector(".form");
let duplicateButtons = document.querySelectorAll(".duplicate_button");
let xmlButton = document.querySelector(".xmlButton");

duplicateButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let contentToDuplicate =
      button.parentNode.querySelectorAll(".duplicable")[0];
    let duplicatedElement = contentToDuplicate.cloneNode(true);

    contentToDuplicate.parentNode.insertBefore(
      duplicatedElement,
      contentToDuplicate.nextSibling
    );
  });
});

xmlButton.addEventListener("click", (e) => {
  // Récupérer tous les champs du formulaire
  let formElements = document.querySelectorAll("input, select, textarea");

  // Créer un objet XML
  let xmlDocument = document.implementation.createDocument(
    null,
    "immeuble",
    null
  );

  let immeubleElement = xmlDocument.documentElement;
  immeubleElement.setAttribute("nature-immeuble", "Copropriete");

  let descriptionElement = xmlDocument.createElement("description");
  descriptionElement.textContent =
    document.getElementsByName("immoDescr")[0].value;
  immeubleElement.appendChild(descriptionElement);

  let adresseElement = xmlDocument.createElement("adresse");
  let adresseValue = document.getElementsByName("mainAddress")[0].value;
  let adresseSecondValue =
    document.getElementsByName("secondaryAddress")[0].value;
  let adresseZipValue = document.getElementsByName("zipCode")[0].value;
  let adresseLocaliteValue = document.getElementsByName("commune")[0].value;
  let adresseCountryValue = document.getElementsByName("country")[0].value;

  adresseElement.setAttribute("ligne2", adresseValue);
  adresseElement.setAttribute("ligne3", adresseSecondValue);
  adresseElement.setAttribute("code-postal", adresseZipValue);
  adresseElement.setAttribute("localite", adresseLocaliteValue);
  adresseElement.setAttribute("libelle-pays", adresseCountryValue);
  immeubleElement.appendChild(adresseElement);

  let rows = document.querySelectorAll(".refCadastrale");
  console.log(rows);

  rows.forEach((row, index) => {
    let sectionValue = document.getElementsByName("section")[index].value;
    let numeroValue = document.getElementsByName("parcelleNumber")[index].value;
    let contenanceHaValue = document.getElementsByName("hectares")[index].value;
    let contenanceAres = document.getElementsByName("ares")[index].value;
    let contenanceCa = document.getElementsByName("centiares")[index].value;
    let cadastre = xmlDocument.createElement("cadastre");
    cadastre.setAttribute("section", sectionValue);
    cadastre.setAttribute("numero", numeroValue);
    cadastre.setAttribute("contenance-ha", contenanceHaValue);
    cadastre.setAttribute("contenance-ares", contenanceAres);
    cadastre.setAttribute("contenance-ca", contenanceCa);
    adresseElement.appendChild(cadastre);
  });

  let rows2 = document.querySelectorAll(".lotDescrption");
  rows2.forEach((row2, index) => {
    let numeroValue = document.getElementsByName("numero")[index].value;
    let typeValue = document.getElementsByName("type")[index].value;
    let designationValue = document.getElementsByName("hectares")[index].value;
    let batimentValue = document.getElementsByName("batiment")[index].value;
    let etageValue = document.getElementsByName("level")[index].value;
    let escalierValue = document.getElementsByName("stairs")[index].value;
    let millValue =
      document.getElementsByName("quote-part-1")[index].value +
      "/" +
      document.getElementsByName("quote-part-2")[index].value;
    let lot = xmlDocument.createElement("lot");
    lot.setAttribute("numero", numeroValue);
    lot.setAttribute("type", typeValue);
    lot.setAttribute("designation", designationValue);
    lot.setAttribute("batiment", batimentValue);
    lot.setAttribute("etage", etageValue);
    lot.setAttribute("escalier", escalierValue);
    lot.setAttribute("milliemes-generaux", millValue);
    immeubleElement.appendChild(lot);
  });

  console.log(xmlDocument);
  // Convertir l'objet XML en une chaîne XML
  var xmlString = new XMLSerializer().serializeToString(xmlDocument);

  // Créer un objet Blob pour le contenu XML
  var blob = new Blob([xmlString], { type: "application/xml" });

  // Créer un objet URL pour le Blob
  var url = URL.createObjectURL(blob);

  // Créer un lien invisible pour déclencher le téléchargement
  var a = document.createElement("a");
  a.href = url;
  a.download = "formData.xml";

  // Ajouter le lien au DOM et déclencher le téléchargement
  document.body.appendChild(a);
  a.click();

  // Supprimer le lien du DOM après le téléchargement
  document.body.removeChild(a);
});
