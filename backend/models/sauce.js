const mongoose = require('mongoose');
const regexInput = /^[a-zA-Z0-9]*$/;

const inputRegex = require('../middleware/input-regex');
// exports.inputValidator

const sauceSchema = mongoose.Schema({
    userId :        {type:String, require:false},

    name :          {type:String, require:true, validate:inputRegex.inputValidator, match : [regexInput, 'Input not correct']},
    manufacturer :  {type:String, require:true, validate:inputRegex.inputValidator, match : [regexInput, 'Input not correct']},
    description :   {type:String, require:true, validate:inputRegex.inputValidator, match : [regexInput, 'Input not correct']},
    mainPepper :    {type:String, require:true, validate:inputRegex.inputValidator, match : [regexInput, 'Input not correct']},
    imageUrl :      {type:String, require:false},
    heat :          {type:Number, require:true},
    likes :         {type:Number, require:false},
    dislikes :      {type:Number, require:false},
    usersLiked:     {type:[String], require:false},
    usersDisliked : {type:[String], require:false}
});

module.exports = mongoose.model('Sauce', sauceSchema);

/* 
- - - solution 1

/^[A-Za-z]+$/
description :
^ start with
$ end with
all from A to Z
all from a to z
+ meaning : 1 or more repetition


- - - solution 2
^[a-zA-Z0-9]*$
description :
^ is the beginning of the line anchor
$ is the end of the line anchor
[...] is a character class definition
* is "zero-or-more" repetition

- - - solution 3

/^[a-zA-Z0-9 "!?.-]+$/
description :
allows from a to z
allows from A to Z
allows from 0 to 9
allows symbols like ? and !
allows space



- - - solution 4
pour du texte en français
/^[a-zA-ZÀ-ÿ-. ]*$/
description :
^         Start of the string
[ ... ]*  Zero or more of the following:
  a-z     lowercase alphabets
  A-Z     Uppercase alphabets
  À-ÿ     Accepts lowercase and uppercase characters including letters with an umlaut
  -         dashes
  .         periods
            spaces
$         End of the string

*/