const Session = require('../models/session.model.js');

exports.open = (req, res) => {
    session = new Session({
        pages: 0
    });

    session.save()
        .then(data => {
            res.send(data._id);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
}

exports.verify = (req, res) => {
    Session.findById(req.params.session_id)
        .then(data => {
            if(!data){
                res.send("false");
            }else{
                res.send("true");
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
}

exports.update = (req, res) => {
    data = req.body;
    Session.findByIdAndUpdate(req.params.session_id, {
        timeZone: data.timeZone || 'Not set',
        language: data.language || 'Not set',
        software: {
            os: {
                vendor: data.software.os.vendor || 'Not Set',
            },
            browser: {
                vendow: data.software.browser.vendor || 'Not Set',
                version: data.software.browser.version || 'Not Set'
            },
        },
        display: {
            scale: data.display.scale || 'Not Set',
            width: data.display.width || 'Not Set',
            height: data.display.height || 'Not Set',
            colorDepth: data.display.colorDepth || 'Not Set'
        }
    }, {new: false})
        .then(session => {
            res.send("success");
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Session with id " + req.params.noteId + " not found."
                });
            }
            return res.status(500).send({
                message: "Error retrieving session with id " + req.params.noteId
            });
        });
}




























exports.all = (req, res) => {
    Session.find()
        .then(sessions => {
            res.send(sessions);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.delete = (req, res) => {
    Session.findByIdAndRemove(req.params.session_id)
        .then(session => {
            if(!session){
                return res.status(404).send({
                    message: "Session with id " + req.params.noteId + " not found."
                });
            }
            res.send({
                message: "Session has been deleted"
            });
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Session with id " + req.params.noteId + " not found."
                });
            }
            return res.status(500).send({
                message: "Error retrieving Session with id " + req.params.noteId
            });
        });
};