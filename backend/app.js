const express = require('express'); // framework basé sur node.js
const mongoose = require('mongoose'); // pour se connecter à la data base de mongoose Db
const path = require('path'); // permet l'uplaod d'image et de travailler avec les répertoires et chemins de fichiers
const dotenv = require('dotenv').config(); // permet de masquer les informations de connexion à la base de données à l'aide de variables d'environnement
const helmet = require('helmet'); // permet de protéger l'application de certaines vulnérabilités
const session = require('cookie-session'); // permet de sécuriser les cookies
const nocache = require('nocache'); // permet de désactiver la mise en cache du navigateur

// routes ----------------------------------------------------------
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user')

const app = express();

// connexion à la data base mongo dB ------------------------------
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// middleware -------------------------------------------------------
// Configuration cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.AUTHORIZED_ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// permet d'extraire l'objet JSON des requêtes POST 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// permet de configurer les en-tête HTTP de manière aproprié pour améliorer la sécurité de l'application 
app.use(helmet());

// désactive la mise en cache 
app.use(nocache());

// midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')))

// options pour sécuriser les cookies------------------------------------------------
const expiryDate = new Date(Date.now() + 3600000); // 1 heure (60 * 60 * 1000)
app.use(session({
  name: 'session',
  secret: process.env.SEC_SES,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'http://localhost:3000',
    expires: expiryDate
  }
}));

// routes pour la gestion des ressources ---------------------------------------
// routes dédiées aux sauces
app.use('/api/sauces', saucesRoutes);

// routes dédiées aux users
app.use('/api/auth', userRoutes)

// Export de l'application express pour déclaration dans server.js -------------
module.exports = app;
