require('dotenv').config();

let db_name = process.env.DB_NAME || 'analytics';

module.exports = {
    google: {
        client_id: process.env.GOOGLE_ID,
        client_secret: process.env.GOOGLE_SECRET,
    },
    session: {
        cookieKey: process.env.COOKIE_KEY
    },
    database:{
        url: 'mongodb+srv://' + process.env.DB_USER + ':' +  process.env.DB_PASSWORD + '@' + process.env.DB_HOST + '/' + db_name + '?retryWrites=true'
    }
}