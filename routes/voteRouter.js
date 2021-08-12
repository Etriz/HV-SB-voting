const express = require('express');

const VoteController = require('../controllers/voteController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ api: 'up' });
});
router.get('/votes', VoteController.getAll);
router.get('/votes/:name', VoteController.getByName);
router.put('/votes/', VoteController.updateRating);

router.get('/names/', VoteController.getAllNames);
router.post('/names/', VoteController.addName);
router.delete('/names/', VoteController.deleteName);

router.get('/message/', VoteController.getMessage);
router.put('/message/', VoteController.updateMessage);

router.delete('/deleteall', VoteController.deleteAll);

module.exports = router;
