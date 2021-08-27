const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

function validateEmail(email) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const result = regexEmail.test(email);
    console.log(result);
    return result;
};
// check the email input
// if return = false -> email is ok
// if return = true  -> email is not ok

const userSchema = mongoose.Schema({
    email : {
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type:String,
        require:true
    }
});

// explanation :
// lowercase : convert the string into lowercase string
// validate and match : for the email input checking before sending
// trim : delete white space before and after the string

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);