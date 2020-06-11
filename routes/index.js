var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', length: 5 });
});

// router.get('/', function(req, res){
//   res.send('Hello World');
// });

router.get('/list', function (req, res) {
  fs.readFile( __dirname + "/../data/" + "user.json", 'utf8', function (err, data) {
    console.log( data );
    res.end( data );
  });
});

router.get('/getUser/:username', function(req, res){
  fs.readFile( __dirname + "/../data/user.json", 'utf8', function (err, data) {
       var users = JSON.parse(data);
       res.json(users[req.params.username]);
  });
});

router.post('/addUser/:username', function(req, res){

  console.log('req: ', req)

  var result = {  };
  var username = req.params.username;

  // CHECK REQ VALIDITY
  if(!req.body["password"] || !req.body["name"]){
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
  }

  // LOAD DATA & CHECK DUPLICATION
  fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
      var users = JSON.parse(data);
      if(users[username]){
          // DUPLICATION FOUND
          result["success"] = 0;
          result["error"] = "duplicate";
          res.json(result);
          return;
      }

      // ADD TO DATA
      users[username] = req.body;

      // SAVE DATA
      fs.writeFile(__dirname + "/../data/user.json",
                   JSON.stringify(users, null, '\t'), "utf8", function(err, data){
          result = {"success": 1};
          res.json(result);
      });
  });
});


router.put('/updateUser/:username', function(req, res){

  var result = {  };
  var username = req.params.username;

  // CHECK REQ VALIDITY
  if(!req.body["password"] || !req.body["name"]){
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
  }

  // LOAD DATA
  fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
      var users = JSON.parse(data);
      // ADD/MODIFY DATA
      users[username] = req.body;

      // SAVE DATA
      fs.writeFile(__dirname + "/../data/user.json",
                   JSON.stringify(users, null, '\t'), "utf8", function(err, data){
          result = {"success": 1};
          res.json(result);
      });
  });
});


router.delete('/deleteUser/:username', function(req, res){
  var result = { };
  //LOAD DATA
  fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
      var users = JSON.parse(data);

      // IF NOT FOUND
      if(!users[req.params.username]){
          result["success"] = 0;
          result["error"] = "not found";
          res.json(result);
          return;
      }

      // DELETE FROM DATA
      delete users[req.params.username];

      // SAVE FILE
      fs.writeFile(__dirname + "/../data/user.json",
                   JSON.stringify(users, null, '\t'), "utf8", function(err, data){
          result["success"] = 1;
          res.json(result);
          return;
      });
  });
});

router.get('/about',function(req,res){
  res.render('about.html');
});

module.exports = router;
