const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    title: String,
    domains: Array,
    api_token: String
});

module.exports = mongoose.model('api', apiSchema);