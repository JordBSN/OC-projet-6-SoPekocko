const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    // mot de passe non accepté
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(req.body.password)) {   // Test password strength
      return res.status(401).json({ error: 'Le mot de passe doit contenir une lettre majuscule, une minuscule et au moins 1 chiffre (6 caractères min)' });
    } else {
      // mot de passe accepté
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash
          })
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
          .catch(error => res.status(500).json({ error }));
    }
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // trouve un user 
      .then(user => {
        if (!user) { // si user non trouvé
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // si user trouvé, comparer le mot de pass de la data base avec celui rentré
          .then(valid => { 
            if (!valid) { 
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({ 
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '8h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  

