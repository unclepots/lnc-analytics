require('dotenv').config();
module.exports = {
    url: 'mongodb+srv://' + process.env.DB_USER + ':' +  process.env.DB_PASSWORD + '@cluster0-iffqw.mongodb.net/' + process.env.DB || 'analytics' + '?retryWrites=true'
}