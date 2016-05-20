var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trailsSchema = new Schema({
    name: {type: String},
    city: {type: String},
    state: {type: String},
    zipcode: {type: Number},
    contact: {type: String},
    description: {type: String}
});

module.exports = mongoose.model('Trails', trailsSchema);
