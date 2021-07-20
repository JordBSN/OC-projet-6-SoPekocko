// App.js fait appel aux différentes fonctions implémentées dans l'APi : Accès aux images, aux route User, aux route Sauce
//=========================================================================================
// import des modules npm - Ajout des plugins externes 
// Importation d'express => Framework basé sur node.js
const express = require('express'); 
// Pour gérer la demande POST provenant de l'application front-end, nous devrons être capables d'extraire l'objet JSON de la demande
// Permet d'extraire l'objet JSON des requêtes POST
const bodyParser = require('body-parser');
// On importe mongoose pour pouvoir utiliser la base de données
// Plugin Mongoose pour se connecter à la data base Mongo Db
const mongoose = require('mongoose'); 
// On donne accès au chemin de notre système de fichier
// Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier
const path = require('path');
// Création d'une application express
const app = express();

// Importation des routes
const userRoutes = require('./routes/user');


//=========================================================================================
// Connection à la base de données MongoDB
mongoose.connect('mongodb+srv://Jordan:Mangue2809@cluster0.uxyef.mongodb.net/SoPekocko?retryWrites=true&w=majority', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//=========================================================================================
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
//=========================================================================================
// Export de l'application express pour déclaration dans server.js
module.exports = app