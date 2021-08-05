const Rating = require('../models/voteModel');

const getAll = async (req, res) => {
  await Rating.find({}, (err, votes) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!votes.length) {
      return res.status(404).json({ success: false, error: 'No votes cast yet!' });
    }
    return res.status(200).json({ success: true, data: votes });
  }).catch((err) => console.log(err));
};
const getByName = async (req, res) => {
  await Rating.findOne({ name: req.params.name }, (err, person) => {
    if (err) return res.status(400).json({ success: false, error: err });
    if (!person) return res.status(400).json({ success: false, error: 'No such name found' });
    return res.status(200).json({ name: person.name, rating: person.rating });
  }).catch((err) => console.log(err));
};
const updateRating = async (req, res) => {
  const body = req.body;
  const { name, rating } = body;

  if (!body) {
    return res.status(400).json({ success: false, error: 'You must provide a name and rating' });
  }
  const person = await Rating.findOne({ name: name });
  try {
    person.rating[rating] += 1;
    await person.save();
    return res.status(200).json({ success: true, message: `${person.name} ratings updated` });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  getAll,
  getByName,
  updateRating,
};
