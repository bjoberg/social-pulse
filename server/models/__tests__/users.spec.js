import test from 'ava';
import request from 'supertest';
import app from '../../server';
import User from '../user';

import mongoose from 'mongoose';

// Test users
const users = [
  new User({ username: 'test.user', first_name: 'test', last_name: 'user', password: 'password123.1', email: 'test.user.1@gmail.com' }),
  new User({ username: 'test.user2', first_name: 'test2', last_name: 'user2', password: 'password123.2', email: 'test.user.2@gmail.com' }),
];

const mongooseInstance = new mongoose.Mongoose;

test.before('connect to the database', async () => {
  // Connect to the mongo test database instance.
  await mongooseInstance.createConnection('mongodb://localhost:27017/social-pulse-test');
});

test.beforeEach('refresh the data', async () => {
  // Remove any unwanted, modified, users.
  User.remove(err => {
    if (err) {
      console.log('Model not removed.');
    } else {
      console.log('Removed the users.');
    }
  });
  // Add the new users to the test database.
  await User.create(users, err => {
    if (err) {
      console.error('Save failed.', err);
    } else {
      console.log('Saved the user.');
    }
  });
});

test.afterEach(() => {
  // Remove all of the modified users from the test database.
  User.remove(err => {
    if (err) {
      console.log('Model not removed.');
    } else {
      console.log('Removed the users.');
    }
  });
});

test.after(() => {
  // Disconnect from the test database instance.
  mongooseInstance.disconnect(err => {
    if (err) {
      return console.log(err);
    }
    return console.log('Disconnected.');
  });
});

test.serial('test getUsers', async t => {
  // 1. Setup
  t.plan(2);

  // 2. Request
  const res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');

  // 3. Test
  t.is(res.status, 200);
  t.deepEqual(users.length, res.body.users.length);
});

test.serial('test getUserLastName Method', async t => {
  // 1. Setup
  t.plan(3);
  // Request all of the users in the db
  let res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');
  // Get the _id value of the first user in the database.
  const userId = res.body.users[0]._id;

  // 2. Request
  res = await request(app)
    .get(`/api/v1/user/${userId}/last_name`)
    .set('Accept', 'application/json');

  // 3. Test
  const lastNameValue = res.body.user.last_name;
  const lastNameExpected = users[0].last_name;
  const userlengthValue = Object.keys(res.body.user).length;

  t.is(res.status, 200);
  t.deepEqual(userlengthValue, 2, [`REAMDE: value == ${userlengthValue} || expected == 2`]);
  t.deepEqual(lastNameValue, lastNameExpected, [`REAMDE: value == ${lastNameValue} || expected == ${lastNameExpected}`]);
});
