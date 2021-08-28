const passwordSchema = require('../models/password');
const passwordValidator = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({message : 'Password should contain lowercase, uppercase, at least 2 digits, no space, length between 8 and 20'});
        console.log(passwordSchema.validate(req.body.password, {list:true}));
    } else {
        next();
    }
};

/* the model is like :
passwordSchema
.is().min(8) // minimum length 8
.is().max(20) // maximum length 20
.has().uppercase() // must have uppercase letters
.has().lowercase() // must have lowercase letters
.has().digits(2) // must have at least 2 digits
.has().not().spaces() // should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // blacklist these values
*/