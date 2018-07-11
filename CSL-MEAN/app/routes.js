var playerModel = require('./models/player');
var teamModel = require('./models/team');
const multer = require('multer');
var storage = multer.diskStorage(
    {
        destination: 'public/uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname + '-' + Date.now());
        }
    }
);
var upload = multer( { storage: storage } );



module.exports = function(app) {
  
  app.get('/playerlist', function (req, res) {
    console.log('I received a GET request');
    // use mongoose to get all todos in the database
      playerModel.find({}, function(err, players) {
        console.log(players);
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err)
              res.send(err)
          res.json(players); // return all todos in JSON format
      });
  });
  
  app.post('/playerlist', function (req, res) {

    console.log('I received a POST request');
        var playerEntity = new playerModel({
            name:req.body.name, 
            nationality: req.body.nationality, 
            number: req.body.number,
            productImage: req.file.path 
        });
        playerEntity.save(function(error,player){
            if(error){
                console.log("error :" + error);
            }else{
                res.json(player);
            }
        });
  });
    

  app.get('/playerlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    playerModel.findOne({_id: id},function(err,player){
        if(err){
            console.log("error :" + err);
        }else{
            res.json(player);
        }
    });
  });

  app.delete('/playerlist/:id', function (req, res) {
    var id = req.params.id;
    playerModel.remove({
        _id : id
    }, function(err, docs) {
        if (err)
            res.send(err);
        res.send(docs);
    });
  });

  app.put('/playerlist/:id', function (req, res) {
    var id = req.params.id;
    playerModel.update({_id : id}, {$set : {name: req.body.name, nationality: req.body.nationality, number: req.body.number}},{multi:true}, function(error){
        if(error) {
            console.log(error);
        } else {
            console.log('Update success!');
            res.send();
        }
    });
  });

  //////////////
  // Team
  //////////////

  app.get('/teamlist', function (req, res) {
    console.log('I received a GET request');
    // use mongoose to get all todos in the database
      teamModel.find({}, function(err, teams) {
        console.log(teams);
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err)
              res.send(err)
          res.json(teams); // return all todos in JSON format
      });
  });
  
  app.post('/teamlist', upload.single('file'), function(req, res){
    console.log('I received a POST request');

    var fullPath = "uploads/"+req.file.filename;

    var teamEntity = new teamModel({
        name: req.body.name, 
        win: req.body.win, 
        draw: req.body.draw,
        loss: req.body.loss,
        goalsFor: req.body.goalsFor,
        goalsAgainst: req.body.goalsAgainst,
        path: fullPath
    });
    teamEntity.save(function(error,team){
        if(error){
            console.log("error :" + error);
        }else{
            res.json(team);
        }
    });
  });
  
  


  app.get('/teamlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    teamModel.findOne({_id: id},function(err,team){
        if(err){
            console.log("error :" + err);
        }else{
            res.json(team);
        }
    });
  });

  app.delete('/teamlist/:id', function (req, res) {
    var id = req.params.id;
    teamModel.remove({
        _id : id
    }, function(err, docs) {
        if (err)
            res.send(err);
        res.send(docs);
    });
  });

  app.put('/teamlist/:id', function (req, res) {
    var id = req.params.id;
    teamModel.update({_id : id}, {$set : {name: req.body.name, win: req.body.win, draw: req.body.draw, loss: req.body.loss, goalsFor: req.body.goalsFor, goalsAgainst: req.body.goalsAgainst}},{multi:true}, function(error){
        if(error) {
            console.log(error);
        } else {
            console.log('Update success!');
            res.send();
        }
    });
  });




};