var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let sess = req.session;
  if(sess.name){
    res.render('index', { title: 'Express', length: 5, id: req.session.name, name: req.session.name });
    // res.redirect('/');
  }else{
    res.redirect('/about');
  }
});

// router.get('/', function(req, res){
//   res.send('Hello World');
// });

router.get('/login/:id/:password', function(req, res){
  var sess;
  sess = req.session;
  console.log('sess: ', sess);

  fs.readFile(__dirname + "/../data/users.json", "utf8", function(err, data){
      var users = JSON.parse(data);
      var id = req.params.id;
      var password = req.params.password;
      var result = {};
      if(!users[id]){
          // USERNAME NOT FOUND
          result["success"] = 0;
          result["error"] = "not found";
          res.json(result);
          return;
      }

      if(users[id]["password"] == password){
          result["success"] = 1;
          sess.id = id;
          sess.name = users[id]["name"];

          console.log('sess: ', sess);
          res.json(result);

      }else{
          result["success"] = 0;
          result["error"] = "incorrect";
          res.json(result);
      }
  })
});

router.get('/logout', function(req, res){
  let sess = req.session;
  if(sess.name){
      req.session.destroy(function(err){
          if(err){
              console.log(err);
          }else{
              res.redirect('/');
          }
      })
  }else{
      res.redirect('/');
  }
})

router.get('/about',function(req,res){
  res.render('about.html');
});

module.exports = router;
