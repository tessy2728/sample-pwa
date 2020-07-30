var express = require('express');
var gcm = require('node-gcm');
var FCM = require('fcm-node');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var _ = require('lodash');
var router = express.Router();
var users = [
  {
    "id": 105,
    "user_id": "cexOYyS4n7CdOuX6e1lFns:APA91bFeRPO3HO05OxPLteSVF8OErjmV8jfwPUGpp2JqiRtOdtZBMXjGf4x0cI5_5pFLCzXMi4ooFJFQ9B49Gx51ui3pR-YDF1oPmXT3Szbwd9hGJXw71pd_WmNGLuCrLa0I6Bj1NDbm",
    "status": "active"
    }
];

/* GET users listing. */
router.get('/', function (req, res, next) {
  var userData = ({
    firstName: 'Tessy',
    lastName: 'Thomas',
    username: 'tessy.maliekkal',
    email: 'tessy@qburst.com'
  });
  res.status(200).send(users);
  // res.json(movies);
  //    fs.readFile("data/users.json", "utf8", function(err, data){
  //       if(err) throw err;

  //       var resultArray = //do operation on data that generates say resultArray;

  //       res.send(resultArray);
  //   });
  console.log('going to fetch')
  // fs.readFileSync("data/users.json", 'utf8', function (err, data) {
  //    console.log(err, data)
  //    if(err) {
  //       res.status(400);
  //       console.log( err );
  //       throw err;
  //    }
  //    res.status(200).res.send( data );
  // });
});

router.post('/', function (req, res) {
  //Check if all fields are provided and are valid:
  if (!req.body.user_id) {
    res.status(400);
    res.json({ message: "Bad Request" });
  } else {
    var newId = users[users.length - 1].id + 1;
    users.push({
      id: newId,
      user_id: req.body.user_id,
      status: 'active'
    });
    res.json({ message: "New movie created.", location: "/users/" + newId });
  }
});

router.post('/notify/', function (req, res) {
    var fcm = new FCM("AAAA4uyMMjc:APA91bHc98mCIHsZBzocRncgtUOjRKi2us-RYUdMaN49GGZWq5bDGLH6_SC04bR2Ulsm4JmZPPXRKLfhA_HKXV5JgPEWNB259aJ5XNDaeKw3s43V2deB4XN_LuGJbdbKZ3G9HKqC01aB");
    var user_ids = _.map(users, 'user_id');
    
    var message = { 
      // for multiple recipients
      // registration_ids: user_ids, 
      // message: "Hello ...."
      "registration_ids": user_ids,
      "data":{
      "body":"Test Notification !!!",
      "title":"Test Title !!!"
      }
      // for single recipient
      // to: subscribers[0],
  };
  console.log(message)
    fcm.send(message, function(err, response){
      if (err) {
          console.log("Something has gone wrong!");
          console.log(err)                
      } else {
          console.log("Successfully sent with response: ", 
              response);
              res.status(200).send(response )
      }
  }); 
    // var sender = new gcm.Sender("AAAA4uyMMjc:APA91bH3Necv3I8PwB2aa03xEw2pXA907pjS7k7h4zL18OH34cxRDnVUPHU9oDKmZeWxj9q9ZK7dixbEBaeVFntoBzqfN5Et6ZmaF7EArafIwxqquWotcvR-9Vg21fDBUSiXYxqebTWS");

    // // Prepare a message to be sent
    // var message = new gcm.Message({
    //   notification: {
    //     title: "New commit on Github Repo: RIL",
    //     icon: "ic_launcher",
    //     body: "Click to see the latest commit'"
    //   }
    // });
    // // user subscription ids to deliver message to
    // var user_ids = _.map(users, 'user_id');

    // console.log("User Ids", user_ids);

    // // Actually send the message
    // sender.send(message, { registrationTokens:user_ids  }, function (err, response) {
    //   console.log(err, response)
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     res.json({ message: "New notification created.", users: user_ids});
    //     // return res.json(response);
    //   }
    // });
    
  
});



module.exports = router;
