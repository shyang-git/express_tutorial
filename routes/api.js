var express = require('express');
var fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', function (req, res) {
  fs.readFile( __dirname + "/../data/" + "users.json", 'utf8', function (err, data) {
    console.log( data );
    res.end( data );
  });
});

router.get('/user/:id', function(req, res){
  fs.readFile( __dirname + "/../data/users.json", 'utf8', function (err, data) {
       var users = JSON.parse(data);
       res.json(users[req.params.id]);
  });
});

router.post('/user/:id', function(req, res){

  console.log('req: ', req)

  var result = {  };
  var id = req.params.id;

  // CHECK REQ VALIDITY
  if(!req.body["password"] || !req.body["name"]){
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
  }

  // LOAD DATA & CHECK DUPLICATION
  fs.readFile( __dirname + "/../data/users.json", 'utf8',  function(err, data){
      var users = JSON.parse(data);
      if(users[id]){
          // DUPLICATION FOUND
          result["success"] = 0;
          result["error"] = "duplicate";
          res.json(result);
          return;
      }

      // ADD TO DATA
      users[id] = req.body;

      // SAVE DATA
      fs.writeFile(__dirname + "/../data/users.json",
                   JSON.stringify(users, null, '\t'), "utf8", function(err, data){
          result = {"success": 1};
          res.json(result);
      });
  });
});


router.put('/user/:id', function(req, res){

  var result = {  };
  var id = req.params.id;

  // CHECK REQ VALIDITY
  if(!req.body["password"] || !req.body["name"]){
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
  }

  // LOAD DATA
  fs.readFile( __dirname + "/../data/users.json", 'utf8',  function(err, data){
      var users = JSON.parse(data);
      // ADD/MODIFY DATA
      users[id] = req.body;

      // SAVE DATA
      fs.writeFile(__dirname + "/../data/users.json",
                   JSON.stringify(users, null, '\t'), "utf8", function(err, data){
          result = {"success": 1};
          res.json(result);
      });
  });
});

router.delete('/user/:id', function(req, res){
  var result = { };
  //LOAD DATA
  fs.readFile(__dirname + "/../data/users.json", "utf8", function(err, data){
      var users = JSON.parse(data);

      // IF NOT FOUND
      if(!users[req.params.id]){
          result["success"] = 0;
          result["error"] = "not found";
          res.json(result);
          return;
      }

      // DELETE FROM DATA
      delete users[req.params.id];

      // SAVE FILE
      fs.writeFile(__dirname + "/../data/users.json",
                   JSON.stringify(users, null, '\t'), "utf8", function(err, data){
          result["success"] = 1;
          res.json(result);
          return;
      });
  });
});

// seats.json

router.get('/seats', function (req, res) {
  fs.readFile( __dirname + "/../data/" + "seats.json", 'utf8', function (err, data) {
    console.log( data );
    res.end( data );
  });
});

router.get('/seat/:id', function(req, res){
  fs.readFile( __dirname + "/../data/seats.json", 'utf8', function (err, data) {
       var seats = JSON.parse(data);
       res.json(seats[req.params.id]);
  });
});

router.post('/seat/:id', function(req, res){

  console.log('req: ', req)

  var result = {  };
  var id = req.params.id;

  // CHECK REQ VALIDITY
  if(!req.body["password"] || !req.body["name"]){
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
  }

  // LOAD DATA & CHECK DUPLICATION
  fs.readFile( __dirname + "/../data/seats.json", 'utf8',  function(err, data){
      var seats = JSON.parse(data);
      if(seats[id]){
          // DUPLICATION FOUND
          result["success"] = 0;
          result["error"] = "duplicate";
          res.json(result);
          return;
      }

      // ADD TO DATA
      seats[id] = req.body;

      // SAVE DATA
      fs.writeFile(__dirname + "/../data/seats.json",
                   JSON.stringify(seats, null, '\t'), "utf8", function(err, data){
          result = {"success": 1};
          res.json(result);
      });
  });
});


router.put('/seat/:id', function(req, res){

  var result = {  };
  var id = req.params.id;

  // CHECK REQ VALIDITY
  if(!req.body["password"] || !req.body["name"]){
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
  }

  // LOAD DATA
  fs.readFile( __dirname + "/../data/seats.json", 'utf8',  function(err, data){
      var seats = JSON.parse(data);
      // ADD/MODIFY DATA
      seats[id] = req.body;

      // SAVE DATA
      fs.writeFile(__dirname + "/../data/seats.json",
                   JSON.stringify(seats, null, '\t'), "utf8", function(err, data){
          result = {"success": 1};
          res.json(result);
      });
  });
});

router.delete('/seat/:id', function(req, res){
  var result = { };
  //LOAD DATA
  fs.readFile(__dirname + "/../data/seats.json", "utf8", function(err, data){
      var seats = JSON.parse(data);

      // IF NOT FOUND
      if(!seats[req.params.id]){
          result["success"] = 0;
          result["error"] = "not found";
          res.json(result);
          return;
      }

      // DELETE FROM DATA
      delete seats[req.params.id];

      // SAVE FILE
      fs.writeFile(__dirname + "/../data/seats.json",
                   JSON.stringify(seats, null, '\t'), "utf8", function(err, data){
          result["success"] = 1;
          res.json(result);
          return;
      });
  });
});


module.exports = router;
