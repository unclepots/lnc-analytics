// Import Packages
const sanitize = require('sanitize');
const sanitizer = sanitize();
const crypto = require('crypto');

// Import Models
const API = require('../models/api.model.js');

exports.root = (req, res) => {
    res.send({message: "Root API"})
}

exports.get_all = (req, res) => {
    if(req.user.role != 'admin'){
        res.send({
            message: 'Access denied.'
        });
    }else{
        API.find().then(apis => {
            res.render('apis', {user: req.user, apis: apis});
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving apis."
            });
        });
    }
}

exports.new = (req, res) => {
    const title = sanitizer.value(req.body.title, "str");
    const domains = sanitizer.value(req.body.domains, "str").split(',');
    
    const api = new API({
        title: title,
        domains: domains
    });

    api.save().then(new_api => {
        const api_token = crypto.createHash('sha256').update(new_api.id).digest("hex");

        API.findByIdAndUpdate(new_api._id,{
            api_token: api_token
        }, {new: true}).then(updated_api => {
            if(!updated_api){
                res.send({error: "Error adding API key"});
            }
            res.send(updated_api);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating api."
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating api."
        });
    });
}