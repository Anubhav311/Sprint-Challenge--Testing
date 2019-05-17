const router = require('express').Router();

const Games = require('./games-model.js');


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

router.get('/', (req, res) => {
    Games.find()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    Games.findById(req.params.id)
        .then(response => {
            if(response) {
                res.status(200).json(response)
            } else {
                res.status(404).send({message: "There's no game with the provided id"})
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.delete('/:id', (req, res) => {
    Games.remove(req.params.id)
        .then(game => {
            if(game > 0) {
                res.status(200).json(game)
            } else {
                res.status(404).send({message: `there's no game with id: ${req.params.id}`})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'we could not delete the game'})
        })
});

module.exports = router;