'use strict';

var mongoose = require('mongoose');

// Make connection
mongoose.connect("mongodb://localhost:27017/social-pulse");
var db = mongoose.connection;

// If there is an error
db.on("error", function(err) {
  console.log("Connection error:", err);
});

// Open the connection
db.once("open", function(err) {
  console.log("db connection successful.");
  var Schema = mongoose.Schema;

  // User
  const userSchema = new Schema({
    username: {type: 'String', required: true},
    first_name: {type: 'String', required: true},
    last_name: {type: 'String', required: true},
    password: {type: 'String', required: true},
    email: {type: 'String', required: true},
    email_is_verified: {type: 'Boolean', default: false, required: true},
    signup_date: {type: 'Date', default: Date.now, required: true},
    last_user_interaction: {type: 'Date', default: Date.now, required: true},
    social_media: [
      {
        social_title: {type: 'String'},
        date_added: {type: 'Date', default: Date.now},
        date_modified: {type: 'Date', default: Date.now},
        auth_token: {type: 'String'}
      }
    ],
    notification_list: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}
    ],
    notification_preferences: {
      newsletter: {type: 'Boolean', default: true},
      updates: {type: 'Boolean', default: true},
      password_reminder: {type: 'Boolean', default: true},
      backup_email_reminder: {type: 'Boolean', default: true}
    },
    security: {
      two_factor_auth: {type: 'Boolean', default: false},
      backup_email: {type: 'String', default: null},
      verification_code: {type: 'Number', default: null}
    }
  });

  // Create the model(s)
  var User = mongoose.model("User", userSchema);

  // Create the test user
  var testUser1 = new User({
    username: "test.user.1",
    first_name: "test.1",
    last_name: "user.1",
    password: "password123.1",
    email: "test.user.1@gmail.com"
  });

  var testUser2 = new User({
    username: "test.user.2",
    first_name: "test.2",
    last_name: "user.2",
    password: "password123.2",
    email: "test.user.2@gmail.com"
  });

  /**
   * 1. Remove any current users
   * 2. Save the user
   * 3. Close the db
   */
  User.remove({}, function(err){
    if (err) {
        console.error("Removal failed", err);
    } else {
        console.log("All data removed!")
    }
    testUser1.save(function(err){
      if(err) console.error("Save failed.", err);
      else console.log("Saved test user 1!");
      testUser2.save(function(err){
        if(err) console.error("Save failed.", err);
        else console.log("Saved test user 2!");
        db.close(function() {
          console.log("db connection closed.");
        });
      });
    });
  });
});