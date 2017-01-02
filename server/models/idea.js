var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ideaSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  meta: {
    votes: Number
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Idea', ideaSchema);
