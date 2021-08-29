# HOT TAKES #

## Installation ##

Here are the dependancies you need to install:
- NodeJS 12.14 or 14.0.
- Angular CLI 7.0.2.
- node-sass : make sure to use the corresponding version to NodeJS. For Noe 14.0 for instance, you need node-sass in version 4.14+.

On Windows, these installations require to use PowerShell in administrator mode.

First, clone this repo and run `npm install`.


## Usage ##

In the FRONTEND, please do the following command :

Run `npm start`. This should both run the local server and launch your browser.

If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:8080.

The app should reload automatically when you make a change to a file.

Use `Ctrl+C` in the terminal to stop the local server.

In the BACKEND, please do the following command :

Run `npm run start` or `npm start`. This should run nodemon in case you do not have the access rights.

Or run `nodemon server` as usual if running script is authorized.

INFORMATION ABOUT DOTENV : how to use it ?

First, create a file with the name : .env in the backend file.
Then, in the file .env add the following text : 

port = 3000



DATABASEMONGO = "mongodb+srv://username:password@cluster0.your-reference-from-mongo.mongodb.net/test?retryWrites=true&w=majority"



TOKEN = string for security



COOKIE = string for security

Finally, save the .env file for use.

:)
