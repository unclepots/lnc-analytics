const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    start: Date,
    duration: String,
    timeZone: String,
    language: String,
    hardware: {
        system: String,
        cores: String
    },
    software: {
        os: String,
        browser: String
    },
    display: {
        vendor: String,
        renderer: String,
        screenWidth: Number,
        screenHeight: Number,
        colorDepth: Number
    },
    social: {
        facebook: Boolean,
        google: Boolean,
        instagram: Boolean,
        dropbox: Boolean,
        twitter: Boolean
    },
    connection: {
        publicIP: String,
        localIP: String,
        provider: String,
        speed: String
    },
    location: {
        latitude: String,
        longitude: String,
        country: String,
        region: String,
        city: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Session', SessionSchema);