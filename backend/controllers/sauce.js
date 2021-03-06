const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : []
    });
    sauce.save()
    .then(()=> res.status(201).json({message : 'New Sauce Added'}))
    .catch(error => res.status(400).json({error}));
};





exports.likeSauce = (req, res, next) => {
    Sauce
    .findOne({_id: req.params.id})
    .then(sauce => {
        const like = req.body.like;
        const user = req.body.userId;

        if (like === 1) {
            if (!sauce.usersLiked.includes(user)) {
                sauce.likes++;
                sauce.usersLiked.push(user);
            }
        }

        if (like === -1) {
            if(!sauce.usersDisliked.includes(user)) {
                sauce.dislikes++;
                sauce.usersDisliked.push(user);
            }
        }

        if (like === 0) {
            if (sauce.usersLiked.includes(user)) {
                sauce.likes--;
                const index = sauce.usersLiked.indexOf(user);
                sauce.usersLiked.splice(index, 1);
            }
            if (sauce.usersDisliked.includes(user)) {
                sauce.dislikes--;
                const index = sauce.usersDisliked.indexOf(user);
                sauce.usersDisliked.splice(index, 1);
            }
        }
        Sauce
        .updateOne(
            {_id : req.params.id},
            {
                likes : sauce.likes,
                dislikes : sauce.dislikes,
                usersLiked : sauce.usersLiked,
                usersDisliked : sauce.usersDisliked,
                _id : req.params.id
            }
        )
        .then(()=> res.status(200).json({message : 'Update rating for like or dislike'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(404).json({error}));
};


exports.getAllSauces = (req, res, next) => {
    Sauce
    .find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
};


exports.getOneSauce = (req, res, next) => {
    Sauce
    .findOne({_id : req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}))
};


exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce
    .updateOne({_id : req.params.id}, {...sauceObject, _id : req.params.id})
    .then(()=> res.status(200).json({message:'Sauce Updated'}))
    .catch(error => res.status(400).json({error}));
};



exports.deleteSauce = (req, res, next) => {
    Sauce
    .findOne({_id : req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce
            .deleteOne({_id: req.params.id})
            .then(()=> res.status(200).json({message : 'Sauce deleted'}))
            .catch(error => res.status(400).json({error}));
        });
    })
    .catch(error => res.status(500).json({error}));    
};



