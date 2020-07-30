var express = require('express');
var gcm = require('node-gcm');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var _ = require('lodash');
var users = [
  {
    "id": 105,
    "user_id": "dzgPGiFu5ag:APA91bHu9Dse90d8KEHf-3SNXc2ZmsGvJhi1MxUIJdNDtjcmvlsQBRXsDNywz7Psx4iCUOa_0J7LNq7DkAGghxILc3jx_a-VxLZ51M94jtWiHoKh7bK37JtgTkP_cbe4aV5PiUBhG5ox",
    "status": "active"
    }
];

router.post('/', function (req, res) {
  
    var sender = new gcm.Sender(process.env.FCM_API_KEY);

    // Prepare a message to be sent
    var message = new gcm.Message({
      notification: {
        title: "New commit on Github Repo: RIL",
        icon: "ic_launcher",
        body: "Click to see the latest commit'"
      }
    });
    // user subscription ids to deliver message to
    var user_ids = _.map(users, 'user_id');

    console.log("User Ids", user_ids);

    // Actually send the message
    sender.send(message, { registrationTokens: user_ids }, function (err, response) {
      if (err) {
        console.error(err);
      } else {
        return res.json(response);
      }
    });
    res.json({ message: "New notification created."});
  
});

module.exports = router;
