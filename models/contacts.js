var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  // id is created automatically
  name: String,
  job: String,
  nickname: String,
  email: String,
  notes: [{
    postedDate: {
      type: Date,
      'default': Date.now
    },
    note: String
  }]
});

module.exports = mongoose.model('Contact', contactSchema);