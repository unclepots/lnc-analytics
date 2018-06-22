const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    session_id: String,
    origin: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    message: String
},{
    timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);