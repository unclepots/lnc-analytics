const Session = require('../models/session.model.js');

exports.open = (req, res) => {
    session = new Session;

    session.save()
        .then(data => {
            res.send(data._id);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
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