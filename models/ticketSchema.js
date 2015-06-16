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
    iframe: String,
    userID: String,
    name: String,
    phone: String,
    department: String,
    date: String
});

module.exports = mongoose.model('Ticket', TicketSchema);