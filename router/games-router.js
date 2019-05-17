const router = require('express').Router();

const Games = require('./games-model.js');


router.get('/', (req, res) => {
    Games.find()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => res.send(err));
});


module.exports = router;