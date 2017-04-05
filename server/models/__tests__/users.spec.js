import test from 'ava';
import request from 'supertest';
import app from '../../server';
import User from '../user';

import mongoose from 'mongoose';

// Initial users added into test db
const users = [
  new User({ username: "test.user", first_name: "test", last_name: "user", password: "password123.1", email: "test.user.1@gmail.com"}),
  new User({ username: "test.user2", first_name: "test2", last_name: "user2", password: "password123.2", email: "test.user.2@gmail.com"})
];

const mongooseInstance = new mongoose.Mongoose;

test.beforeEach('connect to the database', async t => {  
  User.remove(function (err) {
    if (err) console.log("Model not removed.")
  });
  await mongooseInstance.createConnection("mongodb://localhost:27017/social-pulse-test");
  await User.create(users, function(err){
    if(err) console.error("Save failed.", err);
    else{ console.log("Saved the user.");
    console.log("Before Each was run");}
  });
});

test.afterEach(t => {
  User.remove(function (err) {
    if (err) console.log("Model not removed.")
  });
  console.log("After each was run");
  mongooseInstance.disconnect(err => {
    if(err) return console.log(err);
  });
});

test.serial('Should correctly give number of Users', async t => {
  t.plan(10);

  let res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');

  // Saving id's created for each test user
  const id1 = res.body.users[0]._id;
  const id2 = res.body.users[1]._id;

  t.is(res.status, 200);
  t.deepEqual(users.length, res.body.users.length);
  console.log("Returned correct number of users");

  // Testing getUserFirstName
  res = await request(app)
  .get('/api/v1/user/' + id1 + '/first_name')
  .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(users[0].first_name, res.body.user.first_name);
  console.log("Returned correct last name for test.user1");

  res = await request(app)
  .get('/api/v1/user/' + id2 + '/first_name')
  .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(users[1].first_name, res.body.user.first_name);
  console.log("Returned correct last name for test.user2");

  // Testing getUserEmail
  res = await request(app)
  .get('/api/v1/user/' + id1 + '/email')
  .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(users[0].email, res.body.user.email);
  console.log("Returned correct email for test.user1");

  res = await request(app)
  .get('/api/v1/user/' + id2 + '/email')
  .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(users[1].email, res.body.user.email);
  console.log("Returned correct email for test.user2");
});



