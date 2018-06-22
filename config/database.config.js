require('dotenv').config();
let db_name = process.env.DB || 'analytics';
module.exports = {
    url: 'mongodb+srv://' + process.env.DB_USER + ':' +  process.env.DB_PASSWORD + '@cluster0-iffqw.mongodb.net/' + db_name + '?retryWrites=true'
}