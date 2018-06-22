module.exports = (app) => {
    const contact = require('../controllers/contact.controller.js');

    app.put('/contact/:session_id', contact.register);
}