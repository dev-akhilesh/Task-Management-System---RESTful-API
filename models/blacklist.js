const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: { type: String, required: true }
}, { versionKey: false });

const Blacklist = mongoose.model('Blacklist', blacklistSchema);

module.exports = Blacklist;
