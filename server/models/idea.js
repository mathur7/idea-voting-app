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
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Idea', ideaSchema);
