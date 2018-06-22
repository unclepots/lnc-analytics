const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    timeZone: String,
    language: String,
    pages: Number,
    software: {
        os: {
            vendor: String,
        },
        browser: {
            vendow: String,
            version: String
        },
    },
    display: {
        scale: Number,
        width: Number,
        height: Number,
        colorDepth: Number
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Session', SessionSchema);