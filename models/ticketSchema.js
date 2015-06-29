/**
 * Created by brianaamodt on 6/12/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TicketSchema = new Schema({
    ticketNum: String,
    problem: String,
    email: String,
    browser: String,
    description: String,
    userID: String,
    name: String,
    phone: String,
    department: String,
    date: {type: Date, default: new Date()},
    tktStatus: String,

    // video stuff
    token: String,
    randtag: String,
    videoURL: String,
    embedURL: String,
    iframe: String

});

module.exports = mongoose.model('Ticket', TicketSchema);