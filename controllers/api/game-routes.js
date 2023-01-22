const router = require('express').Router();
const { Game, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const newGame = await Game.create({
        gameNumber: req.body.gameNumber,
      });
    } catch (err) {
        res.status(420).json(err)
    }
});

router.get('/', async (req, res) => {
    try {
        const gameData = await Game.findAll({
        include: [{
            model: Game,
            model: User,
        }]
    });
    res.json(gameData);
} catch (err) {
    console.error(err);
    res.json(err);
}
})

router.get('/:id', async (req,res) => {
    try {
        const gameData = await Game.findByPk(req.params.id, {
            include: [{
                model: Game,
                model: User,
            }]
        });
        res.json(gameData);
    } catch {
        console.error(err);
        res.json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const gameData = await Game.update(req.body, {
        where: {
          id: req.params.id,
        }
      });
      if (!gameData[0]) {
        res.status(404).json({ message: 'No game found with that id!' });
        return;
      }
      res.status(200).json(gameData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.delete('/:id', async (req, res) => {
    try {
      const gameData = await Game.destroy({ where: { id: req.params.id } });
      res.json(gameData);
  } catch (err) {
      console.error(err);
      res.json(err);
  }
  });



module.exports = router