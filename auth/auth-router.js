const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../secert');
const Auth = require('../auth/auth-model');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash

  Auth.add(user)
  .then(saved => {
    res.status(201).json(saved);
  })
  .catch(error => {
    res.status(500).json(error);
  })
  // implement registration
});

router.post('/login', (req, res) => {
  let { username, password} = req.body;

  Auth.findyBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = genToken(user);
      res.status(200).json({ message: `Welcome ${user.username}`,
    jwt_token: token})
    } else {
      res.status(401).json({message: 'Invalid Credentials'});
    }
  })
  .catch(error => {
    res.status(500).json(error);
  })
  // implement login
});

// logout function
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      res.send("Your stuck");
    } else {
      res.send("Logged out");
    }
  })
});

function genToken(user) {
  const payload = {
    subject: user.id,
    username:user.username,
  }
  const secret = secrets.jwt_secret;
  const options = {
    expiresIn: '30 min'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
