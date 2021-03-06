// - - - File description :
// app.js is a file for a program
// this program is the application

// - - - IMPORT - - -

const express = require('express');
const mongoose = require('mongoose');

// dotenv for environment protection
const dotenv = require('dotenv');
dotenv.config();
console.log(dotenv.config());

// helmet : http headers security in Express
const helmet = require('helmet');
// path : improve in path for access
const path = require('path');
// cache protection : this Express middleware sets some HTTP response headers to try to disable client-side caching
const nocache = require("nocache");
// - - - import morgan for monitoring the http request
const morgan = require('morgan');
// cookie-session : middleware for storing the session data on the client within a cookie
const cookieSession = require('cookie-session');


// file system : access the file in the system
const fs = require('fs');

// - - - ROUTES - - -
// voir plus bas

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

   
// middleware for headers (CORS) for all requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// cookie client side
const uneHeure = 1 * 1000 * 60 * 60;
console.log(uneHeure + ' ms = 1 heure');
const expiryDate = new Date(Date.now() + uneHeure);

app.use(cookieSession({
    name : 'session',
    secret : process.env.COOKIE,
    cookie : {
        secure : true,
        httpOnly : true,
        domain : 'http://localhost:3000',
        expire : expiryDate
    }
}));

// use helmet to protect http headers -> protection and hide X-Powered-By : Express
app.use(helmet());

// turning off caching with
app.use(nocache());


app.use(morgan('tiny'));
// tiny => the minimal output => :method :url :status :res[content-length] - :response-time ms


// body parser = expess.json()
// use it before the post request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// multer : file manager and path direction
app.use('/images', express.static(path.join(__dirname, 'images')));


// -- Routes --
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// ROUTES for API REST
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// export the module app
module.exports = app;