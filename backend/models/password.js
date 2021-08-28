const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8) // minimum length 8
.is().max(20) // maximum length 20
.has().uppercase() // must have uppercase letters
.has().lowercase() // must have lowercase letters
.has().digits(2) // must have at least 2 digits
.has().not().spaces() // should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // blacklist these values

// console.log for test
/*
console.log(schema.validate('validPASS123'));
console.log(schema.validate('invalidPASS'));
console.log(schema.validate('joke', {list:true}));

// {list:true} returns a list of rules which failed instead of true/false
*/

module.exports = passwordSchema;