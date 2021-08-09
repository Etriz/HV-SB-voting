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
const getAllNames = async (req, res) => {
  const names = await Rating.find({}, { _id: 0, name: 1 });
  return res.status(200).json({ success: true, data: names });
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
const addName = async (req, res) => {
  const body = req.body;

  if (!body) return res.status(400).json({ success: false, error: 'You must provide a name' });

  const name = new Rating(body);
  try {
    name.rating = { A: 0, B: 0, C: 0, D: 0 };
    await name.save();
    return res.status(201).json({ success: true, data: name });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};
const deleteName = async (req, res) => {
  const body = req.body;
  await Rating.findOneAndDelete({ name: body.name }, (err, person) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!person) {
      return res.status(404).json({ success: false, error: `Name not found` });
    }

    return res.status(200).json({ success: true, message: `${person.name} removed` });
  }).catch((err) => console.log(err));
};
const getMessage = async (req, res) => {
  const message = await Rating.findOne({ name: 'message' });
  return res.status(200).json({ success: true, data: message });
};
const updateMessage = async (req, res) => {
  const body = req.body;
  const message = await Rating.findOne({ name: 'message' });
  message.message = body.message;
  await message.save();
  return res.status(200).json({ success: true, data: message });
};

module.exports = {
  getAll,
  getByName,
  updateRating,
  getAllNames,
  addName,
  deleteName,
  getMessage,
  updateMessage,
};
