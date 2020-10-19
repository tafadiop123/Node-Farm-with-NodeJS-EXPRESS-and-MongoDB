/*
/////// 1 - Hello Word on Node ///////////
const hello = "Hello Tafa";
console.log(hello);
*/


////////////////////////////////////////////////////////
//////////////  FILE  //////////////////

//////// 2 - Reading and Writing Files - Blocking synchronous way//////////
/*
const fs = require("fs");

// On commence ainsi à utiliser le mdule "fs" pour la lecture et l'écriture de fichiers
const textIn = fs.readFileSync("./myCode/txt/input.txt", "utf-8");
console.log(textIn);

// Maintenant on va créer un variable texte puis on va l'écrire dans un nouveau fichier texte
const textOut = `This is what know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./myCode/txt/output.txt", textOut);
console.log("Le nouveau fichier est créé !");
*/

////////// 3 - Reading and Writing Files Asynchronously (Non-blocking)  /////////////////////

//fs.readFile("./myCode/txt/starttt.txt", "utf-8", /*la fonction callback*/ (err, data1)=> {
    //if (err) return console.log("Error !"); //permet de gérer les erreurs
    //fs.readFile(`./myCode/txt/${data1}.txt`, "utf-8", (err, data2)=> {
        //console.log(data2);
        //fs.readFile("./myCode/txt/append.txt", "utf-8", (err, data3)=> {
            //console.log(data3);

            //fs.writeFile("./myCode/txt/final_byMe.txt", `${data2}\n${data3}`, "utf-8", (err)=>{
                //console.log("Your file has been written successfully!");
            //});
        //});
    //});
//});
//console.log("Reading File.....");


////////////////////////////////////////////////////////////////
////////////////  SERVER  ////////////////

///////////// 4 - Creating a simple web server /////////////////////////////////////
/* Maintenant on va réaliser un serveur web capable d'accepter les requêtes et de renvoyer les réponses0
Pour cela on va rajouter un module nommé "http" ensuite on va utiliser une méthode de ce module nommé "createServer" qui va contenir 
toutes les requêtes et toutes les réponses. 
La méthode "listen" prend plusieurs paramètres dont : le port(8000 par exemple), l'adresse du localhost
*/

/*
const fs = require("fs");
const http = require("http");

//New server created
const server = http.createServer((req, res)=>{
    //console.log(req)
    res.end("Hello from the server Tafa!");
});

server.listen(8000, "127.0.0.1", ()=>{
    console.log("Listening to requests on port 8000");
});
*/
///////////// 5 - Routing //////////////////////////////////
/* Il faut savoir que le routing peut-être trés comploqué lorsqu'on développe une grande application et pour cela on utilise la librairie "Express"
Maintenant on va faire un petit routing */
/*
const http = require("http");
const url = require("url");

//New server created
const server = http.createServer((req, res)=>{
    const pathname = req.url;

    if (pathName === "/" || pathName === "/taf"){
        res.end("Hello from the server Tafa!");
    } else if (pathName === "/product"){
        res.end("Hello for the product!");
    } else {
        //Le header est un code qui permet de renvoyer une information concernant la réponse que l'on renvoie au client 
        res.writeHead(404, { 
            "Content-type" : "text/html",
            "my-own-header" : "hello-world"
        });
        res.end("<h1>This page can't be found!</h1>");
    }
});

server.listen(8000, "127.0.0.1", ()=>{
    console.log("Listening to requests on port 8000");
});
*/


//////////////// 6 - Building a very simple API   //////////////////////////////////////////
/*
Dans cette partie on va construire un API. Mais qu'est-ce-qu'un API?
Un API est un service à partir duquel on peut faire une requête de quelques données.
Dans notre use case, les données que l'utilisateur demande, sont les données des produits que l'on vend dans ce projet "Node Farm"
Dans cette partie on va utiliser un code synchrone vu que la lecture du fichier JSON va se faire qu'une seule fois au-dessus de la fonction 
callback  
*/
//////////////// 7 - HTML Templating Building the templates   ///////////////////////////////
/*Dans cette section je vais remplir un temmplate HTML dynamiquement grace au fichier "data.json"
*/
/*
const http = require("http");
const fs = require("fs");
const url = require("url");

//On crée la fonction qui permet de remplacer le template " replaceTemplate "
const replaceTemplate = (temp, product) => {
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
};

//On va lire chaque template créé
const tempOverview = fs.readFileSync(`${__dirname}/myCode/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/myCode/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/myCode/templates/template-product.html`, "utf-8");

//On lit le fichier JSON
const data = fs.readFileSync(`${__dirname}/myCode/dev-data/data.json`, "utf-8");
// 2ème Méthode : fs.readFile("./myCode/dev-data/data.json"); C'est la même chose

const dataObj = JSON.parse(data);

//New server created
const server = http.createServer((req, res)=>{
    const pathName = req.url;
    //Overview Page
    if (pathName === "/" || pathName === "/taf"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        //Ici on utilise la méthode " map " car on veut retourner quelque chose car il accepte une fonction callback qui prend commme argument 
        //l'élément récent " el " de la boucle, qui sera enregistrer dans un array
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
        res.end(output);
    //Product Page
    } else if (pathName === "/product"){
        res.end("Hello for the product!");

    //API
    } else if (pathName === "/api") {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data); 

    //Not Found page
    } else {
        //Le header est un code qui permet de renvoyer une information concernant la réponse que l'on renvoie au client 
        res.writeHead(404, { 
            "Content-type" : "text/html",
            "my-own-header" : "hello-world"
        });
        res.end("<h1>This page can't be found!</h1>");
    }
});

server.listen(5500, "127.0.0.1", ()=>{
    console.log("Listening to requests on port 5500");
});
*/

//////////////// 8 - Parsing Variables from URLs  ///////////////////////////////
/*Dans cette section je vais faire du parsing de variable au sein d'un URL ou d'une route 
*/
//////////////// 9 - Using my own Modules  ///////////////////////////////
/*Dans cette section je vais créer un module qui me permettra d'exporter ou d'importer une fonction entre les modules 
*/
const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./myCode/modules/replaceTemplate");



//On va lire chaque template créé
const tempOverview = fs.readFileSync(`${__dirname}/myCode/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/myCode/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/myCode/templates/template-product.html`, "utf-8");

//On lit le fichier JSON
const data = fs.readFileSync(`${__dirname}/myCode/dev-data/data.json`, "utf-8");
// 2ème Méthode : fs.readFile("./myCode/dev-data/data.json"); C'est la même chose

const dataObj = JSON.parse(data);

//New server created
const server = http.createServer((req, res)=>{
    //On crée la variable qui va contenir le query et le nom du chemin en utilisant le fonction de restructuration ES6 " { } "
    const {query, pathname} = (url.parse(req.url, true));
    //Overview Page
    if (pathname === "/" || pathname === "/taf"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        //Ici on utilise la méthode " map " car on veut retourner quelque chose car il accepte une fonction callback qui prend commme argument 
        //l'élément récent " el " de la boucle, qui sera enregistrer dans un array
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
        res.end(output);
    //Product Page
    } else if (pathname === "/product"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        //On va créé la variable qui va receuillir l'id de la requête 
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    //API
    } else if (pathname === "/api") {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data); 

    //Not Found page
    } else {
        //Le header est un code qui permet de renvoyer une information concernant la réponse que l'on renvoie au client 
        res.writeHead(404, { 
            "Content-type" : "text/html",
            "my-own-header" : "hello-world"
        });
        res.end("<h1>This page can't be found!</h1>");
    }
});

server.listen(5500, "127.0.0.1", ()=>{
    console.log("Listening to requests on port 5500");
});


///////////////////// 10 - Introduction to NPM and the package json File              ///////////////////////////////////////////
/*
Pour exécuter le Node Package Manager commence par érire sur le terminal "npm init", e va qui me ermettre d'avoir un fichier "package.json" qui est
en quelque sorte un fichier de configuration.
Il y'a 2 types de packages que l'on peut installer, soit on installe les dépendances simples ou on développe nos propres dépendances.
Les dépendances simples ou régulières sont juste des packages qui contiennent des lignes de code, que l'on va intégrer dans notre code,
c'est pourquoi on l'appelle une dépendance, car sans elle notre projet ne peut pas marcher correctement. Par exemple, le framework " EXRESSS " de 
NodeJS est une dépendance régulière que l'on va utiliser dans ce projet. 
- Dans ce projet la première dépendance que l'on va installer est " slugify " qui est un outil qui permet de produire plus d'URL lisibles en dehors des noms
par exemple le nom des produits dans le projet "Node Farm" .
Pour installer un package ou une dépendance avec NPM, on utilise le terminal en écrivant : " npm install NOM DU PACKAGE "
- Le deuxième package que l'on va installer se nomme " nodemon ", mais ici il faut que l'on spécifie que c'est une dépendance de développement
ainsi on va écrire sur le terminal : " npm install nodemon --save-dev ". 
Notons que le package NODEMON est un outil important qui permet de développer des applications avec NodeJS en redémarrant automatiquement 
l'application à chaque fois que je change un ou plusieurs fichiers ou encore de working directory.

---->>>> Remarque : La différence entre ces 2 types d'installations de dépendances, est que la première est installer en local et ne va marcher
qu'avec ce projet, donc il faudra le réinstaller si on en a besoin dans un autre projet.
Parcontre la deuxième dépendance, elle est installé globalement sur la machine, c'est-à-dire qu'elle peut marcher sur tous les projets NodeJS, 
et on n'aura pas besoins de le réinstaller chaque fois que je débute un nouveau projet. Par exemple sur ce projet pour installer la dépendance 
NODEMON globallement on va écrire sur le terminal : " npm install( ou écrire juste " i ") nodemon --global "


Alors une fois que la déendance est disponible, au lieu d'exécuter le code par " node FICHIER.JS à EXECUTER", on écrit 
" nodemon FICHIER.JS à EXECUTER ", par exemple : " nodemon index.js " comme dans ce projet. Ainsi ce n'est plus la peine d'activer et ressortir
à chaque fois du serveur, quand on effectue des modifications dans le code JS et les autres modules aussi. 

----->>>> NB : Il y'a une autre façon d'exécuter le projet en utilisant l'option start dans le fichier "package.json", pour ce faire dans la 
partie "script" on va écrire le code qui permet qui permet d'exécuter le projet et dans le terminal on va juste écrire : " npm run start"


*/