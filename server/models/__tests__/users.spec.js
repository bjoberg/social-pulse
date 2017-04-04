// External modules
import test from 'ava';
import mongoose from 'mongoose';
import request from 'supertest';

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

async function getTestUserIdByIndex(userIndex) {
  // TODO: Use find function instead of GET reqest.
  const res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');
  return res.body.users[userIndex]._id;
}

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
  const userId = await getTestUserIdByIndex(0);

  // 2. Request
  const res = await request(app)
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
  const userId = await getTestUserIdByIndex(0);

  // 2. Request
  const res = await request(app)
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
  const userId = await getTestUserIdByIndex(0);

  // 2. Request
  const res = await request(app)
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

/**
 * Test the GET method 'getUserSocial'
 */
test('Test getUserSocial', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(0);

  // 2. Request
  const res = await request(app)
    .get(`/api/v1/user/${userId}/social`)
    .set('Accept', 'application/json');

  // 3. Test
  const numberOfUserKeysValue = Object.keys(res.body.user).length;
  const numberOfUserKeysExpected = 2;
  const socialValue = res.body.user.social_media;
  const socialExpected = [];

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(numberOfUserKeysValue, numberOfUserKeysExpected, [`REAMDE: value == ${numberOfUserKeysValue} || expected == ${numberOfUserKeysExpected}`]);
  t.deepEqual(socialValue, socialExpected, [`REAMDE: value == ${socialValue} || expected == ${socialExpected}`]);
});

/**
 * Test the GET method 'getUserSecurity'
 */
test('Test getUserSecurity', async t => {
  // 1. Setup
  t.plan(6);
  const userId = await getTestUserIdByIndex(0);

  // 2. Request
  const res = await request(app)
    .get(`/api/v1/user/${userId}/security`)
    .set('Accept', 'application/json');

  // 3. Test
  const numberOfUserKeysValue = Object.keys(res.body.user).length;
  const numberOfUserKeysExpected = 2;
  const numberOfSecurityKeysValue = Object.keys(res.body.user.security).length;
  const numberOfSecurityKeysExpected = 3;
  const securityVerificationCodeValue = res.body.user.security.verification_code;
  const securityVerificationCodeExpected = null;
  const securityBackupEmailValue = res.body.user.security.backup_email;
  const securityBackupEmailExpected = null;
  const securityTwoFactorAuthValue = res.body.user.security.two_factor_auth;
  const securityTwoFactorAuthExpected = false;

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(numberOfUserKeysValue, numberOfUserKeysExpected, [`REAMDE: value == ${numberOfUserKeysValue} || expected == ${numberOfUserKeysExpected}`]);
  t.deepEqual(numberOfSecurityKeysValue, numberOfSecurityKeysExpected, [`REAMDE: value == ${numberOfSecurityKeysValue} || expected == ${numberOfSecurityKeysExpected}`]);
  t.deepEqual(securityVerificationCodeValue, securityVerificationCodeExpected, [`REAMDE: value == ${securityVerificationCodeValue} || expected == ${securityVerificationCodeExpected}`]);
  t.deepEqual(securityBackupEmailValue, securityBackupEmailExpected, [`REAMDE: value == ${securityBackupEmailValue} || expected == ${securityBackupEmailExpected}`]);
  t.deepEqual(securityTwoFactorAuthValue, securityTwoFactorAuthExpected, [`REAMDE: value == ${securityTwoFactorAuthValue} || expected == ${securityTwoFactorAuthExpected}`]);
});

/**
 * Test the PUT method 'putUserUsername'
 */
test('Test putUserUsername', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(1);
  const updatedUsernameExpected = 'updated';

  // 2. Request
  const res = await request(app)
    .put(`/api/v1/user/${userId}/username`)
    .send({ username: updatedUsernameExpected })
    .set('Content-Type', 'application/json');

  // 3. Test
  const updatedUsernameValueObject = await User.findOne({ _id: userId }, 'username');
  const updatedUsernameValue = updatedUsernameValueObject.username;
  const responseValue = res.body.output;
  const responseExpected = `Success! the username has been save with value { _id: ${userId}, username: '${updatedUsernameExpected}' }`;

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(updatedUsernameValue, updatedUsernameExpected, [`REAMDE: value == ${updatedUsernameValue} || expected == ${updatedUsernameExpected}`]);
  t.deepEqual(responseValue, responseExpected, [`REAMDE: value == ${responseValue} || expected == ${responseExpected}`]);
});
