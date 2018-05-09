var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true
  },
  members: [String]
});

module.exports= mongoose.model('Rooms', roomSchema);
