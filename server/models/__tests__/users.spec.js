// External modules
import test from 'ava';
import request from 'supertest';
import mongoose from 'mongoose';

// Local modules
import app from '../../server';
import User from '../user';

// Test users
const users = [
  new User({ username: 'test.user', first_name: 'test', last_name: 'user', password: 'password123.1', email: 'test.user.1@gmail.com' }),
  new User({ username: 'test.user2', first_name: 'test2', last_name: 'user2', password: 'password123.2', email: 'test.user.2@gmail.com' }),
];

// MongoDb instance.
const mongooseInstance = new mongoose.Mongoose;

test.before.serial('Connect to the database', async () => {
  // Connect to the mongoDb test database instance.
  await mongooseInstance.createConnection('mongodb://localhost:27017/social-pulse-test', err => {
    if (err) {
      console.error('Connection failed', err);
    } else {
      console.log('Connected.');
    }
  });

  // Add the new users to the test database.
  await User.create(users, err => {
    if (err) {
      console.error('Save failed.', err);
    } else {
      console.log(`Saved ${users.length} new users.`);
    }
  });
});

test.beforeEach.serial('Refresh the data', async () => {
  // await User.create(users, err => {
  //   if (err) {
  //     console.error('Save failed.', err);
  //   } else {
  //     console.log('Saved the users.');
  //   }
  // });
});

test.afterEach.serial.always('Remove any modified data', async () => {
  // await User.remove(err => {
  //   if (err) {
  //     console.error('Could not remove the user.', err);
  //   } else {
  //     console.log('Removed the users.');
  //   }
  // });
});

test.after.always('Disconnect from the database', async () => {
  // Remove all of the users.
  await User.remove(err => {
    if (err) {
      console.error('Could not remove the user.', err);
    } else {
      console.log('Removed all of the users.');
    }
  });

  // Disconnect from the mongoDb test database intance.
  await mongooseInstance.disconnect(err => {
    if (err) {
      return console.error('Disconnection failed.', err);
    }
    return console.log('Disconnected.');
  });
});

/**
 * Test the GET method 'getUsers'
 */
test('Test getUsers method', async t => {
  // 1. Setup
  t.plan(2);

  // 2. Request
  const res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');

  // 3. Test
  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.true(res.body.users.length >= users.length);
  // t.fail();
});

/**
 * Test the GET method 'getUser'
 */
test('Test getUser method', async t => {
  // 1. Setup
  t.plan(4);

  // Get the _id value of the first user in the database.
  let res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');
  const userId = res.body.users[0]._id;

  // 2. Request
  res = await request(app)
    .get(`/api/v1/user/${userId}`)
    .set('Accept', 'application/json');

  // 3. Test
  const numberOfUsersValue = Object.keys(res.body).length;
  const numberOfUsersExpected = 1;
  const usernameValue = res.body.user.username;
  const usernameExpected = users[0].username;
  const emailValue = res.body.user.email;
  const emailExpected = users[0].email;

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(numberOfUsersValue, numberOfUsersExpected, [`REAMDE: value == ${numberOfUsersValue} || expected == ${numberOfUsersExpected}`]);
  t.deepEqual(usernameValue, usernameExpected, [`REAMDE: value == ${usernameValue} || expected == ${usernameExpected}`]);
  t.deepEqual(emailValue, emailExpected, [`REAMDE: value == ${emailValue} || expected == ${emailExpected}`]);
});

/**
 * Test the GET method 'getUserLastName'
 */
test('Test getUserLastName method', async t => {
  // 1. Setup
  t.plan(3);
  // Get the _id value of the first user in the database.
  let res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');
  const userId = res.body.users[0]._id;

  // 2. Request
  res = await request(app)
    .get(`/api/v1/user/${userId}/last_name`)
    .set('Accept', 'application/json');

  // 3. Test
  const numberOfUserKeysValue = Object.keys(res.body.user).length;
  const numberOfUserKeysExpected = 2;
  const lastNameValue = res.body.user.last_name;
  const lastNameExpected = users[0].last_name;

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(numberOfUserKeysValue, numberOfUserKeysExpected, [`REAMDE: value == ${numberOfUserKeysValue} || expected == ${numberOfUserKeysExpected}`]);
  t.deepEqual(lastNameValue, lastNameExpected, [`REAMDE: value == ${lastNameValue} || expected == ${lastNameExpected}`]);
});

/**
 * Test the GET method 'getUserEmailIsVerified'
 */
test('Test getUserEmailIsVerified method', async t => {
  // 1. Setup
  t.plan(3);
  // Get the _id value of the first user in the database.
  let res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');
  const userId = res.body.users[0]._id;

  // 2. Request
  res = await request(app)
    .get(`/api/v1/user/${userId}/email_is_verified`)
    .set('Accept', 'application/json');

  // 3. Test
  const numberOfUserKeysValue = Object.keys(res.body.user).length;
  const numberOfUserKeysExpected = 2;
  const emailIsVerifiedValue = res.body.user.email_is_verified;
  const emailIsVerifiedExpected = false;

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(numberOfUserKeysValue, numberOfUserKeysExpected, [`REAMDE: value == ${numberOfUserKeysValue} || expected == ${numberOfUserKeysExpected}`]);
  t.deepEqual(emailIsVerifiedValue, emailIsVerifiedExpected, [`REAMDE: value == ${emailIsVerifiedValue} || expected == ${emailIsVerifiedExpected}`]);
});

