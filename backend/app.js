const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user')


mongoose.connect('mongodb+srv://Jordan:Mangue2809@cluster0.uxyef.mongodb.net/SoPekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

 const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS ===============================================================
app.use(cors());

  app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
  
  app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  })
// ===============================================================
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes)

module.exports = app; 