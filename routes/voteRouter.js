const express = require('express');

const VoteController = require('../controllers/voteController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ api: 'up' });
});
router.get('/votes', VoteController.getAll);
router.get('/votes/:name', VoteController.getByName);
router.put('/votes/:name', VoteController.updateRating);

module.exports = router;
