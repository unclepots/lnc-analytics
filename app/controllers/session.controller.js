// Import Packages
const tools = require('../../config/tools');

// Import Models
const Session = require('../models/session.model.js');
const API = require('../models/api.model.js');

// Create Session
const createSession = (res, token) => {
    const new_session = new Session({
        pages: 0
    });

    new_session.save().then(session => {
        var sid = tools.encrypt(session.id);
        return_session(sid, res, token);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error creating session."
        });
    });
}

// Verify Session
const verifySession = (sid, res, token) => {
    var session_id = tools.decrypt(sid);
    Session.findById(session_id).then(session => {
        if(!session){
            createSession(res, token);
        }else{
            return_session(sid, res, token);
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error searchingf for session."
        });
    });
}

// Return Session info
const return_session = (sid, res, token) => {
    res.cookie('lnc-id', sid, { maxAge: 31536000000}).render('session', {token: token});
}

// Session Init
exports.get = (req, res) => {
    const sid = tools.read_cookie(req.headers.cookie, 'lnc-id');
    
    const host = req.headers.host;
    const token = req.params.token
    API.findOne({
        api_token: token
    }).then(api => {
        if(api.domains.includes(host)){
            if(!sid || sid === 'undefined'){
                createSession(res, token);
            }else{
                verifySession(sid, res, token);
            }
        }else{
            res.status(401).send({
                message: "Not Authorized"
            })
        }
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error searching for api."
        });
    });
    
}

exports.update = (req, res) => {
    console.log(req.ip);
    const sid = tools.read_cookie(req.headers.cookie, 'lnc-id');

    if(sid && sid != 'undefined'){
        
        Session.findByIdAndUpdate(tools.decrypt(sid), tools.session_data(req.body), {new: true}).then(session => {
            if(!session){
                res.status(404).send({
                    message: "Session ID not found.",
                    ip: req.ip
                });
            }else{
                res.send({
                    message: "Recorded."
                });
            }
        })

    }else{
        res.status(404).send({
            message: "Session ID not set."
        });
    }
}