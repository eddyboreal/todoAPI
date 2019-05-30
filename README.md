# todoAPI
Une API contruite avec fastify et MongoDB

## Par quoi commencer ?
Nous allons construire une API permettant d'échanger des données pour la gestion d'une Todolist !
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
Pour cela, utilisez la commande suivante : `npm i --save nodemon mongoose fastify boom`

*Mais qu'avons-nous installé ?*
* D'abord, nous avons installé **fastify** qui est un puissant framework web réputé pour sa rapidité
* Ensuite, **mongoose** nous fournira une solution pour la modélisation de nos données, celles qui seront renvoyées par notre API
* Enfin, **boom** est un module qui nous sera utile pour retourner des erreurs HTTP

## Il serait temps de lancer notre serveur
Dans le fichier **package.json**, ajoutez le script `"start": "./node_modules/nodemon/bin/nodemon.js ./src/index.js"`. Par la suite, nous pourrons utiliser la commande `npm start` dans le terminal pour lancer notre serveur avec **nodemon**. Ainsi, à chaque changement dans un de nos fichiers, nodemon s'occupera de mettre à jour notre serveur.

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

## Connectons la base de données
Rappelez-vous, nous avons installé plus tôt le module **mongoose** via npm. Maintenant, importons le dans notre fichier **index.js** et connectons la base de donnée :
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mycargarage')
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err))
```
En sauvegardant votre fichier, vous devriez voir *MongoDB connected* dans votre terminal.

## Créons un schema pour notre todolist
Dans le dossier **/src**, créez un dossier **/models** et ajoutez-y le fichier **Todo.js**.
Ajoutons-y le code suivant :
```javascript
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  label: String,
  description: String
});

module.exports = mongoose.model('Todo', todoSchema);
```
Nous avons ici importer **mongoose** puis créez un schema. Celui-ci nous permets de définir les données associer à notre modèle **Todo**. Notre Todolist aura donc un *label* ainsi qu'une *description*. C'est deux champs sont de type *String*. Enfin, nous exportons notre modèle dans la dernière ligne.

## Créons un controller pour notre Todolist
Nous avons créer plus tôt un model pour notre Todolist. Nous allons maintenant lui associer un **controller** à notre **todoSchema**. Il s'agira de lui associer des fonctions permettant de retourner, de supprimer et de mettre à jour nos données.
Tout d'abord dans le dossier **/src**, créez un dossier **/controllers** et ajoutez-y le fichier **todoController.js**.

Dans le fichier **todoController.js**, importez **boom**. C'est grâce à ce module que nous pourrons retourner les erreurs.
```javascript
const boom = require('boom');
```
Ensuite, importez notre model **Todo** :
```javascript
const Todo = require('../models/Todo');
```

Maintenant réflechissons. Quelles fonctions voulons-nous associer à notre model ?
Voici ce que nous pouvons faire :
* Retourner l'ensemble des todos enregistrées dans notre base de données
* Retourner une todo grâce à son ID généré par MongoDB
* Ajouter une nouvelle todo
* Mettre à jour une todo
* Supprimer une todo

### Ecrivons alors une fonction permettant de renvoyer toutes les todos
```javascript
exports.getTodos = async (req, reply) => {
  try {
    const todos = await Todo.find()
    return todos
  } catch (err) {
    throw boom.boomify(err)
  }
}
```
Nous avons là stocké l'ensemble des données du model Todo puis nous les retournons. Les erreurs pouvant arrivées lors de cette fonction sont catch puis retournées par le module **boom**.

### Ecrivons maintenant une fonction permettant le renvoi d'une todo selon son ID
```javascript
exports.getSingleTodo = async (req, reply) => {
  try {
    const id = req.params.id
    const todo = await Todo.findById(id)
    return todo
  } catch (err) {
    throw boom.boomify(err)
  }
}
```

### Maintenant, une fonction permettant l'ajout d'une todo
```javascript
exports.addTodo = async (req, reply) => {
  try {
    const todo = new Todo(req.body)
    return todo.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}
```

### Mettons la todo à jour
```javascript
exports.updateTodo = async (req, reply) => {
  try {
    const id = req.params.id
    const todo = req.body
    const { ...updateData } = car
    const update = await Car.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}
```

### Supprimons là
```javascript
exports.deleteTodo = async (req, reply) => {
  try {
    const id = req.params.id
    const todo = await Todo.findByIdAndRemove(id)
    return todo
  } catch (err) {
    throw boom.boomify(err)
  }
}
```