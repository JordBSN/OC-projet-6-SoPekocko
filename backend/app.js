// ================ Import des modules npm ================

// Framework basé sur node.js
const express = require('express');
// Permet d'extraire l'bojet JSON des requête POST
const bodyParser = require('body-parser');
// Plugin mongoose pour se connecter à la data base Mongo Db
const mongoose = require('mongoose');
// Plugin qi sert dans l'upload des images et permet de travailler avec les rpertoires et chemin de fichiers
const patch = reqire('patch');