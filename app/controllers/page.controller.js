const Page = require('../models/page.model.js');

exports.register = (req, res) => {
    data = req.body;

    const page = new Page({
        session_id: req.params.session_id || 'Not set',
        host: data.host || 'Not set',
        page: data.page || 'Not set',
        referrer: data.referrer || 'Not set',
        document: {
            title: data.document.title || 'Not set',
            width: data.document.width || 'Not set',
            height: data.document.height || 'Not set',
        },
        network: {
            publicIP: data.network.publicIP || 'Not set',
            provider: data.network.provider || 'Not set',
        },
        location: {
            latitude: data.location.latitude || 'Not set',
            longitude: data.location.longitude || 'Not set',
            country: data.location.country || 'Not set',
            region: data.location.region || 'Not set',
            city: data.location.city || 'Not set',
            postal: data.location.postal || 'Not set'
        }
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
    Page.findByIdAndUpdate(req.params.page_id, {
        closed: 'Closed'
    }, {new: false})
        .then(data => {
            res.send("success");
        }).catch(err => {
            if(err.kind === 'ObjectId'){
                return res.status(404).send({
                    message: "Page with id " + req.params.page_id + " not found."
                });
            }
            return res.status(500).send({
                message: "Error retrieving session with id " + req.params.page_id
            });
        });
}