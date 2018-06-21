const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    timeZone: String,
    language: String,
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
    },
    network: {
        publicIP: String,
        provider: String,
    },
    location: {
        latitude: String,
        longitude: String,
        country: String,
        region: String,
        city: String,
        postal: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Session', SessionSchema);