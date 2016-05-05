var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys.js');
var serverController = require('./serverController.js');
var Cart = require('./models/cart.js');
var Order = require('./models/order.js');
var Product = require('./models/product.js');
var User = require('./models/user.js');
var app = express();

app.use(session({
    secret: keys.sessionSecret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/dirtwaves', function(error) {
    console.log('If this > ' + error + ' equals undefined, we can party');
});

mongoose.set('debug', true);

app.use(express.static(__dirname + '/public'));

// Facebook login protocols---------------------------------
passport.use(new FacebookStrategy({
    clientID: keys.facebookID,
    clientSecret: keys.facebookSecret,
    callbackURL: "http://localhost:3000/login/facebook/callback"
}, function(token, refreshToken, profile, done) {
    return done(null, profile);
}));

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/shop',
    failureRedirect: '/login/facebook'
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(object, done) {
    done(null, object);
});
//---------------------------------------------------------

// Get facebook login
app.get('/login/facebook', serverController.facebookLogin);

// add product to database
app.post('/products', serverController.addProductToDatabase);

// display all products in database
app.get('/products', serverController.displayProductsOnDatabase);

// display product on database by id
app.get('/products/:id', serverController.displayProductOnDatabaseById);

// update product on databse by id
app.put('/products/:id', serverController.updateProductOnDatabaseById);

// delete product on database by id
app.delete('/products/:id', serverController.deleteProductOnDatabaseById);













app.listen(3000, function() {
    console.log("Party on port 3000");
});  // closing server tag
