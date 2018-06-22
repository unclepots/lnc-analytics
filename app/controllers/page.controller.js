const Page = require('../models/page.model.js');
const Session = require('../models/session.model.js');
const sanitize = require('sanitize');
const sanitizer = sanitize();

exports.register = (req, res) => {
    let session_id = req.paramString("session_id");
    let host = sanitizer.value(req.body.host, "str");
    let path = sanitizer.value(req.body.path, "str");
    let referrer = sanitizer.value(req.body.referrer, "str");
    let title = sanitizer.value(req.body.document.title, "str");
    let width = sanitizer.value(req.body.document.width, "int");
    let height = sanitizer.value(req.body.document.height, "int");
    let publicIP = sanitizer.value(req.body.network.publicIP, "str");
    let provider = sanitizer.value(req.body.network.provider, "str");
    let latitude = sanitizer.value(req.body.location.latitude, "str");
    let longitude = sanitizer.value(req.body.location.longitude, "str");
    let country = sanitizer.value(req.body.location.country, "str");
    let region = sanitizer.value(req.body.location.region, "str");
    let city = sanitizer.value(req.body.location.city, "str");
    let postal = sanitizer.value(req.body.location.postal, "str");

    const page = new Page({
        session_id: session_id || 'Not set',
        host: host || 'Not set',
        path: path || 'Not set',
        referrer: referrer || 'Not set',
        document: {
            title: title || 'Not set',
            width: width || 'Not set',
            height: height || 'Not set',
        },
        network: {
            publicIP: publicIP || 'Not set',
            provider: provider || 'Not set',
        },
        location: {
            latitude: latitude || 'Not set',
            longitude: longitude || 'Not set',
            country: country || 'Not set',
            region: region || 'Not set',
            city: city || 'Not set',
            postal: postal || 'Not set'
        }
    });

    Session.update({
        _id: session_id
    }, {
        $inc: {
            pages: 1
        }
    }).then(data => {
        console.log("Page Count Increased");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

    page.save()
        .then(data => {
            res.send(data._id);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
    
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