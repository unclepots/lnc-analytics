const Contact = require('../models/contact.model.js');

exports.register = (req, res) => {
    let session_id = req.paramString('session_id');
    let origin = req.bodyString('origin');
    let firstname = req.bodyString('firstname');
    let lastname = req.bodyString('lastname');
    let email = req.bodyEmail('email');
    let phone = req.bodyString('phone');
    let message = req.bodyString('message');


    if(!session_id && !origin && !firstname && !lastname && !email && !message){
        return res.status(400).send({
            message: "Information  is not complete"
        })
    }

    const contact = new Contact({
        session_id: session_id,
        origin: origin,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        message: message
    });

    contact.save()
        .then(data => {
            res.send("success");
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Contact."
            });
        });
}