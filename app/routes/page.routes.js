module.exports = (app) => {
    const page = require('../controllers/page.controller.js');

    app.put('/page/open/:session_id', page.register);
    app.put('/page/close/:page_id', page.close);
}