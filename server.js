var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys.js');
var serverController = require('./backend/serverController.js');
var Cart = require('./backend/models/cart.js');
var Order = require('./backend/models/order.js');
var Product = require('./backend/models/product.js');
var User = require('./backend/models/user.js');
var Trails = require('./backend/models/trails.js');
var app = express();

// POLICIES //
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

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

//local auth
    passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
    console.log("hit");
    User.findOne({email: email}).exec(function(error, user) {
        console.log(error, user);
        if(error) done(error);
        if(!user) return done(null, false);
        if(user.verifyPassword(password)) return done(null, user);
        return done(null, false);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
    User.findById(_id, function(error, user) {
        done(error, user);
    });
});


//Facebook Auth
    passport.use(new FacebookStrategy({
    clientID: keys.facebookID,
    clientSecret: keys.facebookSecret,
    callbackURL: "http://localhost:3000/login/facebook/callback"
}, function(token, refreshToken, profile, done) {
    //Check/Create User
    User.findOne({fbId: profile.id}, function(error, serverResponse) {
        if (serverResponse) {
            return done(null, serverResponse);
        }
        else {
            var newUser = new User({name: profile.displayName, fbId: profile.id});
            newUser.save(function(userError, userServerResponse) {
                if (userError) {
                    return response.status(500).json(userError);
                }
                else {
                    return done(null, userServerResponse);
                }
            });
        }
    });
}));


app.get('/login/facebook',
    passport.authenticate('facebook'));

app.get('/login/facebook/callback',passport.authenticate('facebook', {
    successRedirect: '/shop',
    failureRedirect: '/login'
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(object, done) {
    done(null, object);
});


// USER===================================================================

app.post('/users', serverController.register);

app.get('/me', isAuthed, serverController.me);

app.put('/users/:id', isAuthed, serverController.update);

app.post('/login', passport.authenticate('local', {
}), function(request, response, next) {
    response.send({login: true});
});

app.get('/logout', function(request, response, next) {
    request.logout();
    return response.status(200).send('logged out');
});



// FB login endpoints===================================================

app.get('/shop', serverController.facebookLogin);

// user login
app.get('/login/current_user', serverController.login);

// user logout
app.get('/logout/current_user', serverController.logout);

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

// PRODUCT==============================================================

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

// Carts===============================================================

// add product to cart
app.put('/cart/addItem', serverController.addItemToCart);

// ORDER===============================================================

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

// TRAILS DATABASE=====================================================

// add trails to database
app.post('/trails', serverController.addTrails);

// // display trails on database
app.get('/trails', serverController.getTrails);

// get trails by id
app.get('/trails/:id', serverController.getTrailsById);

// update trails by ID
app.put('/trails/:id', serverController.updateTrailsById);
//
// // delete trails by ID
app.delete('/trails/:id', serverController.deleteTrails);



// LISTEN=============================================================

app.listen(3000, function() {
    console.log("Party on port 3000");
});  // closing server tag
