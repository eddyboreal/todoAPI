# todoAPI
Une API contruite avec fastify et MongoDB

## Par quoi commencer ?
Pour commencer, nous allons devoir configurer notre environnement MongoDB.
Sur mac, ouvrez votre terminal et entrez successivement les lignes suivantes :
```
brew tap mongodb/brew
brew install mongodb-community@4.0
brew services start mongodb-community@4.0
```
Votre environnement MongoDB est maintenant configuré !

## Créons notre espace de travail
A présent, créons l'architecture de notre API et installons nos dépendences avec npm.
* créez un dossier **/todo_API** dans le répertoire de votre choix
* au sein de celui-ci, créez un dossier **src** qui contiendra le point d'entrée de notre programme
* au sein de **/src**, ajoutez le fichier **index.js**

A la racine de notre projet, initialisons npm avec la commande suivante : `npm init`

Maitenant, nous allons installer via npm **fastify**, **mongoose**, **nodemon** et **boom**.
Pour cela, utilisez la commande suivante : `npm i --save mongoose fastify boom`

*Mais qu'avons-nous installé ?*
* D'abord, nous avons installé **fastify** qui est un puissant framework web réputé pour sa rapidité
* Ensuite, **mongoose** nous fournira une solution pour la modélisation de nos données, celles qui seront renvoyées par notre API 
* Enfin, **boom** est un module qui nous sera utile pour retourner des erreurs HTTP

## Il serait temps de lancer notre serveur
Dans le fichier **package.json**, ajoutez le script `"start": "./node_modules/nodemon/bin/nodemon.js .src/index.js"`. Par la suite, nous pourrons utiliser la commande `npm start` dans le terminal pour lancer notre serveur avec nodemon. Ainsi, à chaque changement dans un de nos fichiers, nodemon s'occupera de mettre à jour notre serveur.

Maintenant, rendez-vous dans le votre fichier *index.js* dans **/todo_API/src/**.
Ajoutez-y les lignes suivantes :
```javascript
const fastify = require('fastify')();

fastify.listen(3000, function(err, address) {
    if(err) {
        console.log(err);
        process.exit(1);
    };
    console.log(`server running on port ${adress}`);
}

```

A présent, rendez-vous sur votre localhost:3000 pour voir votre serveur lancé !

