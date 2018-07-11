// app/models/todo.js

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
    name : String, 
    win : Number, 
    draw : Number,
    loss : Number,
    goalsFor : Number,
    goalsAgainst : Number,
    path : String 
});

module.exports = mongoose.model('teams', TeamSchema);