const router = require('express').Router();

const Games = require('./games-model.js');


router.get('/', (req, res) => {
    Games.find()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => res.send(err));
});

router.post('/register', (req, res) => {
    if(req.body.title && req.body.genre) {
        Games.add(req.body)
        .then(response => {
            res.status(200).send({message: 'game added'});
        })
        .catch(err => {
            if(err.errno == 19) {
                res.status(405).send({message: 'database already has a game with same title.'})
            } else {
                res.status(500).send(err)
            }
        })
    } else {
        res.status(422).send({message: 'title or genre is missing'})
    }
})

module.exports = router;