const express = require('express');

const VoteController = require('../controllers/voteController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ api: 'up' });
});
router.get('/votes', VoteController.getAll);
// router.post('/votes', VoteController);
// router.put('/votes/:id', VoteController);

module.exports = router;
