const mongoose = require('mongoose');

const PageSchema = mongoose.Schema({
    session_id: String,
    host: String,
    path: String,
    referrer: String,
    closed: String,
    document: {
        title: String,
        width: Number,
        height: Number,
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

module.exports = mongoose.model('Page', PageSchema);