const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId :        {type:String, require:false},

    name :          {type:String, require:true, validate:[/^[a-zA-Z0-9 '"!?.-]+$/, 'Input name not accepted']},
    manufacturer :  {type:String, require:true, validate:[/^[a-zA-Z0-9 '"!?.-]+$/, 'Input manufacturer not accepted']},
    description :   {type:String, require:true, validate:[/^[a-zA-Z0-9 '"!?.-]+$/, 'Input description not accepted']},
    mainPepper :    {type:String, require:true, validate:[/^[a-zA-Z0-9 '"!?.-]+$/, 'Input main pepper not accepted']},
    imageUrl :      {type:String, require:false},
    heat :          {type:Number, require:true},
    likes :         {type:Number, require:false},
    dislikes :      {type:Number, require:false},
    usersLiked:     {type:[String], require:false},
    usersDisliked : {type:[String], require:false}
});

module.exports = mongoose.model('Sauce', sauceSchema);

/* solution 1

/^[A-Za-z]+$/
description :
^ start with
$ end with
all from A to Z
all from a to z
+ meaning : 1 or more repetition

*/

/* solution 2

/^[a-zA-Z0-9 "!?.-]+$/
description :
allows from a to z
allows from A to Z
allows from 0 to 9
allows symbols like ? and !
allows space

*/