const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId :        {type:String, require:false},

    name :          {type:String, require:true},
    manufacturer :  {type:String, require:true},
    description :   {type:String, require:true},
    mainPepper :    {type:String, require:true},
    imageUrl :      {type:String, require:false},
    heat :          {type:Number, require:true},
    likes :         {type:Number, require:false},
    dislikes :      {type:Number, require:false},
    usersLiked:     {type:[String], require:false},
    usersDisliked : {type:[String], require:false}
});

module.exports = mongoose.model('Sauce', sauceSchema);

/*

/^[A-Za-z]+$/
description :
^ start with
$ end with
all from A to Z
all from a to z
+ meaning : 1 or more repetition

*/