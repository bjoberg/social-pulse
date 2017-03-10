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

  // Social_Media
  const socialMediaSchema = new Schema({
    user_id: {},
    social_title: {type: 'String', required: true},
    date_added: {type: 'Date', default: Date.now, required: true},
    date_modified: {type: 'Date', default: Date.now, required: true},
    auth_token: {type: 'String', required: true}
  });

  // User
  const userSchema = new Schema({
    username: {type: 'String', required: true},
    first_name: {type: 'String', required: true},
    last_name: {type: 'String', required: true},
    password: {type: 'String', required: true},
    email: {type: 'String', required: true},
    verified_email: {type: 'Boolean', default: false, required: true},
    signup_date: {type: 'Date', default: Date.now, required: true},
    last_user_interaction: {type: 'Date', default: Date.now, required: true},
    social_media: [socialMediaSchema],
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
  var testUser = new User({
    username: "test.user",
    first_name: "test",
    last_name: "user",
    password: "password123",
    email: "test.user@gmail.com"
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
    testUser.save(function(err){
      if(err) console.error("Save failed.", err);
      else console.log("Saved!");
      db.close(function() {
        console.log("db connection closed.");
      });
    });
  });
});