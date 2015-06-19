var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoDataSchema = new Schema({
    token: String,
    randtag: String,
    videoURL: String,
    embedURL: String,
    iframe: String
});

module.exports = mongoose.model('Videos', VideoDataSchema);