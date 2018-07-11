// app/models/todo.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
    name : String, 
    nationality : String, 
    number : Number 
});

module.exports = mongoose.model('players', PlayerSchema);