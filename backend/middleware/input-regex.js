const validate = require('mongoose-validator');

exports.inputValidator = [
    validate({
        validator : 'matches',
        arguments : /^[a-zàâçéèêëîïôûùüÿñæœ0-9 \n,'.!?-]*$/i,
        message : 'Please verify your input again, only letters and numbers'
    })
];

// /^[a-zàâçéèêëîïôûùüÿñæœ0-9 \n,'.!?-]*$/i
// a-z
// A-Z
// 0-9
// all french 
// no {} [] / % # @