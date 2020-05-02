var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var counter = 1;
var limit = 3;
function addInput(divName){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "Entry " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
          document.getElementById(divName).appendChild(newdiv);
          counter++;
     }
}







/* GET home page. */
// Defines the root route. router.get receives a path and a function
// The req object represents the HTTP request and contains
// the query string, parameters, body, header
// The res object is the response Express sends when it receives
// a request
// render says to use the views/index.jade file for the layout
// and to set the value for title to 'Express'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/newactivity', function(req, res, next) {
  res.render('newactivity', { title: 'Add Activity' });
});

router.get('/login', function(req, res) {
	res.render('login', { title: 'Login'})
})

router.get('/profile', function(req, res) {
  if(!req.cookies.username)
    res.redirect('login');
	res.render('profile', { title: 'Profile'})
})

router.get('/chat_page', function(req, res) {
	res.render('chat_page', {title: 'Chat Page'})
})
	
router.get('/registration', function(req,res) {
	res.render('registration', {title: 'Register'})
})

router.get('/makeaccounts', function(req, res) {
  res.render('makeaccounts', {title: 'Chat Page'})
})

router.get('/activity_feed', function(req, res) {
  res.render('activity_feed', {title: 'Activity Feed'})
})



router.get('/userlist', function(req,res) {
  res.render('userlist', {title: 'Userlist'})
})

router.get('/change_status', function(req,res) {
  res.render('change_status', {title: 'Change Status'})
})

router.get('/participants', function(req,res) {
  res.render('participants', {title: 'Participants'})
})

router.get('/updatepicture', function(req,res) {
  res.render('updatepicture', {title: 'Update Picture'})
})

router.get('/writemessage', function(req,res) {
  res.render('writemessage', {title: 'Write Message'})
})


router.get('/termsofservice', function(req,res) {
  res.render('termsofservice',{title: 'Terms of Service'});
})

router.get('/privacypolicy', function(req,res) {
  res.render('privacypolicy',{title: 'Privacy Policy'});
})

router.get('/createchat', function(req,res) {
  res.render('createchat',{title: 'Create Chat'});
})


router.get('/startchat', function(req, res, next) {
  if(!req.cookies.username)
    res.render('login', { title: 'login' });

  // Obtaining value from the cookie
  var username = req.cookies.username;
  console.log(username);

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/logininfo';
MongoClient.connect(url, function(err, db){
if (err) {
console.log('Unable to connect to the Server:', err);
} else {
console.log('Connected to Server');
var collection = db.collection('logininfo');

collection.find({"username": username}).toArray(function (err, result) {
  console.log(result.length);
if (err) {
res.send(err);
} else if (result.length) {
  res.render('createchat',{"abc" : result});
} else {
  console.log("Hi");
res.send('Invalid login');
}
db.close();
}); 
} 
}); 
});

router.get('/chatpagetransition', function(req, res, next) {
  if(!req.cookies.username)
    res.render('login', { title: 'login' });

  // Obtaining value from the cookie
  var username = req.cookies.username;
  console.log(username);

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/logininfo';
MongoClient.connect(url, function(err, db){
if (err) {
console.log('Unable to connect to the Server:', err);
} else {
console.log('Connected to Server');
var collection = db.collection('logininfo');

collection.find({"username": username}).toArray(function (err, result) {
  console.log(result.length);
if (err) {
res.send(err);
} else if (result.length) {
  res.render('chat_page',{"abc" : result});
} else {
  console.log("Hi");
res.send('Invalid login');
}
db.close();
}); 
} 
}); 
});

router.get('/activityfeedtransition', function(req, res, next) {
  if(!req.cookies.username)
    res.render('login', { title: 'login' });

  // Obtaining value from the cookie
  var username = req.cookies.username;
  console.log(username);

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/logininfo';
MongoClient.connect(url, function(err, db){
if (err) {
console.log('Unable to connect to the Server:', err);
} else {
console.log('Connected to Server');
var collection = db.collection('logininfo');

collection.find({"username": username}).toArray(function (err, result) {
  console.log(result.length);
if (err) {
res.send(err);
} else if (result.length) {
  res.render('activity_feed',{"abc" : result});
} else {
  console.log("Hi");
res.send('Invalid login');
}
db.close();
}); 
} 
}); 
});

/*
router.get('/makeaccount', function(req,res) {
  res.render('makeaccount', {title: 'Make Account'})
})
*/
router.get('/logininfo', function(req, res){
  // Get a Mongo client to work with the Mongo server
  var MongoClient = mongodb.MongoClient;
  // Define where the MongoDB server is
  var url = 'mongodb://localhost:27017/sampsite';
  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    // We are connected
    console.log('Connection established to', url);
    // Get the documents collection
    var collection = db.collection('logininfo');
    // Find all students
    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.render('logininfo',{
          // Pass the returned database documents to Jade
          "logininfo" : result
        });
      } else {
        res.send('No documents found');
      }
      //Close connection
      db.close();
    });
  }
  });
});

router.get('/logininfo', function(req, res){
  // Get a Mongo client to work with the Mongo server
  var MongoClient = mongodb.MongoClient;
  // Define where the MongoDB server is
  var url = 'mongodb://localhost:3000/sampsite';
  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    // We are connected
    console.log('Connection established to', url);
    // Get the documents collection
    var collection = db.collection('logininfo')
    // Find all students
    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.render('logininfo',{
          // Pass the returned database documents to Jade
          "logininfo" : result
        });
      } else {
        res.send('No documents found');
      }
      //Close connection
      db.close();
    });
  }
  });
});

router.post('/makechat', function(req, res){
    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;
    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/chats';
    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
        // Get the documents collection
        var collection = db.collection('chats');
        var collectionb = db.collection('logininfo')
        var activity = req.body.activity;
        var username = req.cookies.username
        // Get the student data passed from the form
        var chats = {chat: {name: activity, messages: ["Chat started!"]}};
        collectionb.find({"username": username}).toArray(function (err, result) {
          console.log(result.length);
        if (err) {
        res.send(err);
        } else if (result.length) {
          var abc = result;
        }});
        
        // Insert the student data into the database
        collection.insert([chats], function (err, result){
          if (err) {
            console.log(err);
          } else {
            console.log("Hi");
            // Redirect to the homepage
            collection.find({"name": activity}).toArray(function(err, results){
              res.render('chat_page', {chats: result, abc: results});
            })
            
          }
          // Close the database
          db.close();
        });
      }
    });
  });



router.get('/registration', function(req, res){
    res.render('registration', {title: 'Registration' });
});

router.post('/makeaccount', function(req, res){
    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;
    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/logininfo';
    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
        // Get the documents collection
        var collection = db.collection('logininfo');
        var emailid = req.body.email;
        console.log(emailid);
        // Get the student data passed from the form
        var user1 = {firstname: req.body.firstname, lastname: req.body.lastname,
          email: req.body.email, username : req.body.username, score : 100, activity: 
          [{description : "Joined Facium",
          date: Date(),
          location: "Online",
          participant1: "Me",
          participant2: "Myself"}]}
          
        // Insert the student data into the database
        collection.insert([user1], function (err, result){
          if (err) {
            console.log(err);
          } else {
            console.log("Hi");
            // Redirect to the homepage
            res.render('makeaccounts', {"email" : emailid});
          }
          // Close the database
          db.close();
        });
      }
    });
  });

router.post('/makeaccount2', function(req, res){
    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;
    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/logininfo';
    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
        // Get the documents collection
        
        var email = req.body.email;
        var bio = req.body.biography;
        var phone = req.body.phone;
        var gender = req.body.gender;
        var region  = req.body.region;
        var password = req.body.password;
        console.log(email);
        console.log(bio);
        console.log(gender);
        console.log(phone);
        console.log(password);
        console.log(region);
        
        var collection = db.collection('logininfo');
  
        // Insert the student data into the database
        //collection.insert([user1], function (err, result){
        // collection.update({email:currentUser}, {$set: {task:result.task}}, function (err, result1){  
        //collection.update({email: email}, {$set:{biography:bio , phone:phone, gender: gender}}, function (err,result){
        collection.update({email: email}, {$set:{biography:bio, phone :phone, region:region, password:password}}, function (err,result){
        
          if (err) {
            console.log(err);
          } else {
            console.log("Hi");
            // Redirect to the homepage
            res.redirect("login");
          }
          // Close the database
          db.close();
        });
      }
    });
  });






router.post('/makeactivity', function(req, res){
    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;
    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/logininfo';
    var username = req.cookies.username;
    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
        // Get the documents collection
        
        var activity = req.body.activity;
        var date = req.body.date;
        var location = req.body.location;
        var status = req.body.when;
        var participant1 = req.body.participant1;
        var participant2 = req.body.participant2
        
        
        var collection = db.collection('logininfo');
  
        // Insert the student data into the database
        //collection.insert([user1], function (err, result){
        // collection.update({email:currentUser}, {$set: {task:result.task}}, function (err, result1){  
        //collection.update({email: email}, {$set:{biography:bio , phone:phone, gender: gender}}, function (err,result){
        collection.update({username: username}, 
          {$push:{activity: {description: activity, date: date, location: location, status: status, participant1: participant1, participant2: participant2}}, 
          $inc: { score: 100}}, function (err,result){
        
          if (err) {
            console.log(err);
          } else {
            console.log("Hi");
            // Redirect to the homepage
            res.redirect("profile_page");
          }
          // Close the database
          db.close();
        });
      }
    });
  });




router.post('/updatestatus', function(req,res){
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/logininfo';
  var username = req.cookies.username;
  var newstatus = req.body.status;
  MongoClient.connect(url,function(err,db){
    if (err) {
      console.log('Unable to connect to the Server:', err);
    } else {
      console.log('Connected to Server');
      //var status = req.body.status;
      //var password = req.body.password;
      var collection = db.collection('logininfo');
      collection.update({username: username}, {$set:{status :newstatus}}, function (err,result){
        
          if (err) {
            console.log(err);
          } else {
            console.log("Hi");
            // Redirect to the homepage
            res.redirect("profile_page");
          }
          // Close the database
          db.close();
        });

      }
    })
    });

router.get('/login', function(req, res){
    res.render('login', {title: 'Login' });
});

router.post('/check', function(req, res){
    // Get a Mongo client to work with the Mongo server
    var MongoClient = mongodb.MongoClient;
    // Define where the MongoDB server is
    var url = 'mongodb://localhost:27017/logininfo';
    // Connect to the server
    MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
        // Get the documents collection
        var collection = db.collection('logininfo');
        // Get the student data passed from the form
        var a = req.body.username;
        var b = req.body.password;
        //var status = 0;
       collection.find({"username": a, "password": b}).toArray(function (err, result) {
       if (err) {
        res.send(err);
       } else if (result.length) {
          // Implement cookies
            res.cookie('username', a, {expire : new Date() + 999999999999999});
            res.redirect("profile_page");            

            //res.render('profile',{"profileinfo" : result});
       } else {  
        res.send('Invalid login'); // Make a page for this
        //res.redirect("profile_page"); 
      }
      //Close connection
      db.close();
    });
      }
    });

  });


router.get('/profile_page', function(req, res, next) {
  if(!req.cookies.username)
    res.render('login', { title: 'login' });

  // Obtaining value from the cookie
  var username = req.cookies.username;
  console.log(username);

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/logininfo';
MongoClient.connect(url, function(err, db){
  if (err) {
    console.log('Unable to connect to the Server:', err);
  }
  else {
    console.log('Connected to Server');
    var collection = db.collection('logininfo');

    collection.find({"username": username}).toArray(function (err, result) {
      console.log(result.length);
      if (err) {
        res.send(err);
      }
      else if (result.length) {
        res.render('profile',{"abc" : result});
        console.log(result);
      }
      else {
      console.log("Hi");
      res.send('Invalid login');
      }
      db.close();
    }); 
} 
}); 
});





router.get('/listcookies', function(req, res){
  console.log("Cookies : ", req.cookies);
  res.send('Look in console for cookies');
});

// Delete a  -- LogOut
router.get('/logout', function(req, res){
  res.clearCookie('username');
  //res.send('username Cookie Deleted');
  res.redirect('login');
});



module.exports = router;