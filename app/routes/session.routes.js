const path = require('path');

module.exports = (app) => {
    const session = require('../controllers/session.controller.js');

    app.get('/session', (req, res) => {
        res.sendFile(path.join(__dirname + '../../../html/session.html'));
    });

    app.get('/session/open', session.open);
    app.get('/session/verify/:session_id', session.verify);

    app.put('/session/update/:session_id', session.update);

    app.get('/session/all', session.all);
    app.get('/session/delete/:session_id', session.delete);
}