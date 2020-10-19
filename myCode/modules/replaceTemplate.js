module.exports = function (temp, product) {
    //On crée la fonction qui permet de remplacer le template " replaceTemplate "
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRODUCTPRICE%}/g, product.price);
    output = output.replace(/{%COUNTRYFROM%}/g, product.from);
    output = output.replace(/{%PRODUCTVITAMIN%}/g, product.nutrients);
    output = output.replace(/{%PRODUCTQUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    //Affichage du tag "organic" lorsque le produit est organique ou non
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    return output;
}

