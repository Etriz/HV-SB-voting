const Vote = require('../models/voteModel');

const getAll = async (req, res) => {
  await Vote.find({}, (err, votes) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!votes.length) {
      return res.status(404).json({ success: false, error: 'No votes cast yet!' });
    }
    return res.status(200).json({ success: true, data: votes });
  }).catch((err) => console.log(err));
};

module.exports = {
  getAll,
};
