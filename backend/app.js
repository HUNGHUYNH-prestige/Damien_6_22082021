// - - - File description :
// app.js is a file for a program
// this program is the application

// - - - IMPORT - - -

const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
console.log(dotenv.config());

// helmet : http headers security in Express
const helmet = require('helmet');
// path : improve in path for access
const path = require('path');

const fs = require('fs');

// - - - ROUTES - - -

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// DeprecationWarning: collection.ensureIndex is deprecated
mongoose.set('useCreateIndex', true);

// connection to mongodb with mongoose.connect()
mongoose.connect(`${process.env.DATABASEMONGO}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// app call the express method to create an express application :
const app = express();

// use helmet to protect http headers -> protection and hide X-Powered-By : Express
app.use(helmet());

// - - - import morgan for monitoring the http request
const morgan = require('morgan');
app.use(morgan('tiny'));
// tiny => the minimal output => :method :url :status :res[content-length] - :response-time ms

   
// middleware for headers (CORS) for all requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// body parser = expess.json()
// use it before the post request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// multer : file manager and path direction
app.use('/images', express.static(path.join(__dirname, 'images')));

// ROUTES for API REST
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// export the module
module.exports = app;