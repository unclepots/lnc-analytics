const Session = require('../models/session.model.js');
const sanitize = require('sanitize');
const sanitizer = sanitize();

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
    let session_id = req.paramString("session_id");
    
    Session.findById(session_id)
        .then(data => {
            if(!data){
                res.send("false");
            }else{
                res.send("true");
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving sesstion."
            });
        });
}

exports.update = (req, res) => {
    let session_id = req.paramString("session_id");
    let timeZone = sanitizer.value(req.body.timeZone, "str");
    let language = sanitizer.value(req.body.language, "str");
    let os_vendor = sanitizer.value(req.body.software.os.vendor, "str");
    let browser_vendor = sanitizer.value(req.body.software.browser.vendor, "str");
    let browser_version = sanitizer.value(req.body.software.browser.version, "str");
    let display_scale = sanitizer.value(req.body.display.scale, "int");
    let display_width = sanitizer.value(req.body.display.width, "int");
    let display_height = sanitizer.value(req.body.display.height, "int");
    let display_colorDepth = sanitizer.value(req.body.display.colorDepth, "int");

    Session.findByIdAndUpdate(session_id, {
        timeZone: timeZone || 'Not set',
        language: language || 'Not set',
        software: {
            os: {
                vendor: os_vendor || 'Not Set',
            },
            browser: {
                vendow: browser_vendor || 'Not Set',
                version: browser_version || 'Not Set'
            },
        },
        display: {
            scale: display_scale || 0,
            width: display_width || 0,
            height: display_height || 0,
            colorDepth: display_colorDepth || 0
        }
    }, {new: false})
        .then(data => {
            res.send("success");
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Session with id " + req.params.session_id + " not found."
                });
            }
            return res.status(500).send({
                message: err.message || "Error retrieving session with id " + req.params.session_id
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