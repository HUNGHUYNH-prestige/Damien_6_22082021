const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

function validateEmail(email) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const result = regexEmail.test(email);
    console.log(result);
    
    if (result == true) {
        console.log('email ok');
    } else {
        console.log('email not ok');
    }
};
// check the email input
// if return = false -> email is not ok
// if return = true  -> email is ok

const userSchema = mongoose.Schema({
    email : {
        type:String,
        require:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Not matched, please fill a valid email address']
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


// email type for false
// dododo=@dodo.dodo because =
// pomme/pomme@gmail.de because /



userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);