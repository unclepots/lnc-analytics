// Import Packages
const crypto = require('crypto');
const sanitize = require('sanitize');
const sanitizer = sanitize();

// Import Keys
const keys = require('./keys');

// Set Algorithm
const algorithm = 'aes-256-ctr';


module.exports = {
    // Extract Cookie Value
    read_cookie: (cookies, key) => {
        var value = false;
        const list = cookies.split(';');
        list.forEach(cookie => {
            var splitted = cookie.split('=');
            if(splitted[0].trim() === key){
                value = splitted[1];
            }
        });
        return value;
    },

    // Encrypt Value
    encrypt: (value) => {
        let cipher = crypto.createCipheriv(algorithm, keys.session.secret, keys.session.iv);
        let crypted = cipher.update(value,'utf8','hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    // Decrypt Value
    decrypt: (value) => {
        let decipher = crypto.createDecipheriv(algorithm, keys.session.secret, keys.session.iv);
        let dec = decipher.update(value,'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    },

    // Get Session Data
    session_data: (body) => {
        return {
            timeZone: sanitizer.value(body.timezone, "str") || 'Not set',
            language: sanitizer.value(body.language, "str") || 'Not set',
            software: {
                os: {
                    vendor: sanitizer.value(body.os_vendor, "str") || 'Not Set',
                },
                browser: {
                    vendow: sanitizer.value(body.browser_vendor, "str") || 'Not Set',
                    version: sanitizer.value(body.browser_version, "str") || 'Not Set'
                },
            },
            display: {
                scale: sanitizer.value(body.display_scale, "int") || 0,
                width: sanitizer.value(body.display_width, "int") || 0,
                height: sanitizer.value(body.display_height, "int") || 0,
                colorDepth: sanitizer.value(body.display_colorDepth, "int") || 0
            }
        }
    },
    page_geo: (ip, fn) => {
        where.is(ip, function(err, result){
            fn(result);
        });
    },
    page_data: (body, session_id) => {
        return {
            geo: body.geo,
            session_id: session_id,
            host: sanitizer.value(body.host, "str") || 'Not set',
            path: sanitizer.value(body.path, "str") || 'Not set',
            referrer: sanitizer.value(body.referrer, "str") || 'Not set',
            document: {
                title: sanitizer.value(body.document_title, "str") || 'Not set',
                width: sanitizer.value(body.document_width, "int") || 0,
                height: sanitizer.value(body.document_height, "int") || 0,
            },
            network: {
                publicIP: sanitizer.value(body.network_publicIP, "str") || 'Not set',
                provider: sanitizer.value(body.network_provider, "str") || 'Not set',
            },
            location: {
                latitude: sanitizer.value(body.location_latitude, "str") || 'Not set',
                longitude: sanitizer.value(body.location_longitude, "str") || 'Not set',
                country: sanitizer.value(body.location_country, "str") || 'Not set',
                region: sanitizer.value(body.location_region, "str") || 'Not set',
                city: sanitizer.value(body.location_city, "str") || 'Not set',
                postal: sanitizer.value(body.location_postal, "str") || 'Not set'
            }
        }
    }
}