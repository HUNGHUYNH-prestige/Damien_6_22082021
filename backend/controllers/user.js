const bcrypt = require('bcrypt'); // crypt password
const jwt = require('jsonwebtoken'); // create token
const User = require('../models/user');
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js'); // crypt email
const { SHA1 } = require('crypto-js');

const cryptoEmail = CryptoJS.HmacSHA1('pomme', 'key');
const stringEmail = cryptoEmail.toString();
console.log('regarde1 : ' + cryptoEmail);
console.log('regarde2 : ' + stringEmail);

exports.signup = (req, res, next) => {
    
    const cryptedEmail = CryptoJS.HmacSHA1(req.body.email, 'key');
    //console.log(cryptedEmail);

    const stringOfEmail = cryptedEmail.toString();
    console.log(stringOfEmail);

    bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
        const user = new User ({
            email : req.body.email,
            password : hash
        });
        user
        .save()
        .then( () => res.status(201).json({message:'User created ok'}) )
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {

    const cryptedEmail = CryptoJS.HmacSHA1(req.body.email, 'key');
    //console.log(cryptedEmail);

    const stringOfEmail = cryptedEmail.toString();
    console.log(stringOfEmail);
    
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({error: 'User not found'});
        }
        bcrypt
        .compare(req.body.password, user.password)
        .then(valid => {
            
            if (!valid) {
                return res.status(401).json({error: 'Password incorrect'});
            }
            return res.status(200).json({
                userId : user._id,
                token : jwt.sign(
                    { userId : user._id },
                    process.env.TOKEN,
                    { expiresIn : '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};