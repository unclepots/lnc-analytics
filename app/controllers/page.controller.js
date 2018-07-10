// Import Packages
const tools = require('../../config/tools');

const Page = require('../models/page.model.js');
const Session = require('../models/session.model.js');

exports.open = (req, res) => {
    const sid = tools.read_cookie(req.headers.cookie, 'lnc-id');
    const session_id = tools.decrypt(sid);

    if(sid && sid != 'undefined'){
        
        Session.findOneAndUpdate({
            _id: session_id
        }, {
            $inc: {
                pages: 1
            }
        }).then(session => {
            
            //const page = new Page(tools.page_data(req.body, session.id, ip));
            const page = tools.page_data(req.body, session.id, req.geo);
            
            console.log(page);
            res.send(page);
            return;

            page.save().then(page => {
                res.send({pid: tools.encrypt(page.id)});
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });

    }else{
        res.status(404).send({
            message: "Session ID not set."
        });
    }
}

exports.close = (req, res) => {
    let page_id = req.paramString("page_id");

    Page.findByIdAndUpdate(page_id, {
        closed: 'Closed'
    }, {new: false})
        .then(data => {
            res.send("success");
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Page with id " + page_id + " not found."
                });
            }
            return res.status(500).send({
                message: "Error retrieving session with id " + page_id
            });
        });
}