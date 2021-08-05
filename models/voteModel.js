const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: {
    A: { type: Number },
    B: { type: Number },
    C: { type: Number },
    D: { type: Number },
  },
});

const voteModel = mongoose.model('VoteModel', VoteSchema, 'HV-SB');

module.exports = voteModel;
