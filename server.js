var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys.js');
var serverController = require('./backend/serverController.js');
var Cart = require('./backend/models/cart.js');
var Order = require('./backend/models/order.js');
var Product = require('./backend/models/product.js');
var User = require('./backend/models/user.js');
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
    console.log('If ' + error + ' = undefined, we can party');
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
    failureRedirect: '/login'
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(object, done) {
    done(null, object);
});
//---------------------------------------------------------

// USER---------------------------------------------------

// add endpoint for passport local authenticate.  point to a seperate controller.  AFter MVP.

// Get facebook login
app.get('/shop',
function(request, response, next){
    User.findOne({fbId: request.user.id}, function(error, serverResponse) {
        if (serverResponse) {
            request.user = serverResponse;
            next();
        }
        else {
            var newUser = new User({name: request.user.displayName, fbId: request.user.id});
            newUser.save(request.body, function(userError, userServerResponse) {
                if (userError) {
                    return response.status(500).json(userError);
                }
                else {
                    request.user = userServerResponse;
                    next();
                }
            });
        }
    });
},
serverController.facebookLogin);

// Add new user
app.post('/login/user', serverController.addNewUserToDatabase);

// display all users on database
app.get('/login/user', serverController.displayUsersOnDatabase);

// display user on database by id
app.get('/login/user/:id', serverController.displayUserOnDatabaseById);

// Update user on database by id
app.put('/login/user/:id', serverController.updateUserOnDatabaseById);

// delete user on database by id
app.delete('/login/user/:id', serverController.deleteUserOnDatabaseById);

// PRODUCT------------------------------------------------

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

// ORDER---------------------------------------------------

// Add order to database
app.post('/order', serverController.addOrderToDatabase);

// display all orders on database
app.get('/order', serverController.displayOrdersOnDatabase);

// display order on database by id
app.get('/order/:id', serverController.displayOrderOnDatabaseById);

// update Order on database by id
app.put('/order/:id', serverController.updateOrderOnDatabaseById);

// delete Order on database by id
app.delete('/order/:id', serverController.deleteOrderOnDatabaseById);




app.listen(3000, function() {
    console.log("Party on port 3000");
});  // closing server tag
