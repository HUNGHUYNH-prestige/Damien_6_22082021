const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

function validateEmail(email) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const result = regexEmail.test(email);
    console.log(result);
    return result;
};

// if return = false -> email is ok
// if return = true  -> email is not ok

const userSchema = mongoose.Schema({
    email : {
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type:String,
        require:true
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);