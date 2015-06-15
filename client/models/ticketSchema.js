/**
 * Created by brianaamodt on 6/12/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TicketSchema = new Schema({
    problem: String,
    email: String,
    browser: String,
    description: String,
    iframe: String,
    user: {firstname: String, lastname: String}
});

module.exports = mongoose.model('Ticket', TicketSchema);