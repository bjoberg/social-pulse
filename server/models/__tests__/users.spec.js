import test from 'ava';
import mongoose from 'mongoose';
import request from 'supertest';
import bcrypt from 'bcrypt';

// Local modules
import app from '../../server';
import User from '../user';

const user1password = 'password123.1';
const user2password = 'password123.2';

/**
 * IMPORTANT!!
 * user1 is used for all GET requests
 * user2 is used for all PUT requests
 * user3 is used for the 1 DELETE request
 * NOTE:
 * This is so when the tests are run asyncronously the data does not get confused.
 */
const users = [
  new User({ username: 'test.user', first_name: 'test', last_name: 'user', password: user1password, email: 'test.user.1@gmail.com' }),
  new User({ username: 'test.user2', first_name: 'test2', last_name: 'user2', password: user2password, email: 'test.user.2@gmail.com' }),
  new User({ username: 'test.user3', first_name: 'test3', last_name: 'user3', password: user2password, email: 'test.user.3@gmail.com' }),
];

const mongooseInstance = new mongoose.Mongoose;

test.before('Connect to the database && add the test users.', async () => {
  // Connect to the mongoDb test database instance.
  await mongooseInstance.createConnection('mongodb://localhost:27017/social-pulse-test', err => {
    if (err) {
      console.error('Connection failed', err);
    } else {
      console.log('Connected.');
    }
  });

  // Add the new users to the test database.
  await User.create(users[0], err => {
    if (err) {
      console.error('Save failed.', err);
    } else {
      console.log('Saved user 1 new users.');
    }
  });
  await User.create(users[1], err => {
    if (err) {
      console.error('Save failed.', err);
    } else {
      console.log('Saved user 2 new users.');
    }
  });
  await User.create(users[2], err => {
    if (err) {
      console.error('Save failed.', err);
    } else {
      console.log('Saved user 3 new users.');
    }
  });
  // await User.create(users, err => {
  //   if (err) {
  //     console.error('Save failed.', err);
  //   } else {
  //     console.log(`Saved ${users.length} new users.`);
  //   }
  // });
});

test.after.always('Remove all of the user && disconnect from the database.', async () => {
  // Remove all of the users.
  await User.remove(err => {
    if (err) {
      console.error('Could not remove the user.', err);
    } else {
      console.log('Removed all of the users.');
    }
  });
  await mongooseInstance.disconnect(err => {
    if (err) {
      return console.error('Disconnection failed.', err);
    }
    return console.log('Disconnected.');
  });
});

async function getTestUserIdByIndex(userIndex) {
  let userId = '';
  await User.find().exec((err, user) => {
    if (err) {
      console.error('Error getting the userId.', err);
    }
    userId = user[userIndex]._id;
  });
  return userId;
}

test.serial('Testing Oscars Gets', async t => {
  t.plan(13);

  let res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');

  // Saving id's created for each test user
  const id1 = res.body.users[0]._id;

  t.is(res.status, 200);
  t.deepEqual(users.length, res.body.users.length);
  console.log('Returned correct number of users');

  // Testing getUserUsername
  res = await request(app)
  .get('/api/v1/user/' + id1 + '/username')
  .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(users[0].username, res.body.user.username);
  console.log("Returned correct username for test.user1");

  // Testing getUserFirstName
  res = await request(app)
  .get('/api/v1/user/' + id1 + '/first_name')
  .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(users[0].first_name, res.body.user.first_name);
  console.log("Returned correct last name for test.user1");

  // Testing getUserEmail
  res = await request(app)
  .get('/api/v1/user/' + id1 + '/email')
  .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(users[0].email, res.body.user.email);
  console.log("Returned correct email for test.user1");

  // Testing getUserNotificationPreferences
  res = await request(app)
  .get('/api/v1/user/' + id1 + '/notification_preferences')
  .set('Accept', 'application/json');

  t.is(res.status, 200);
  console.log("Testing users notificaton preferences defaults:");
  t.deepEqual(true, res.body.user.notification_preferences.backup_email_reminder);
  console.log("test.user1 backup_email_reminder returned succesfully");
  t.deepEqual(true, res.body.user.notification_preferences.password_reminder);
  console.log("test.user1 password_reminder returned succesfully");
  t.deepEqual(true, res.body.user.notification_preferences.updates);
  console.log("test.user1 updates returned succesfully");
  t.deepEqual(true, res.body.user.notification_preferences.newsletter);
  console.log("test.user1 newsletter returned succesfully");
});

/**
 * Test the GET method 'getUsers'
 */
test('Test getUsers method', async t => {
  // 1. Setup
  t.plan(2);

  const res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');

  // 3. Test
  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.true(res.body.users.length >= users.length);
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
 * Test the GET method 'getUserPassword'
 */
test('Test getUserPassword method', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(0);

  // 2. Request
  const res = await request(app)
    .get(`/api/v1/user/${userId}/password`)
    .set('Accept', 'application/json');

  // 3. Test
  const numberOfUserKeysValue = Object.keys(res.body.user).length;
  const numberOfUserKeysExpected = 2;
  const passwordValue = res.body.user.password;
  let validPassword = false;
  validPassword = bcrypt.compareSync(user1password, passwordValue);

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(numberOfUserKeysValue, numberOfUserKeysExpected, [`REAMDE: value == ${numberOfUserKeysValue} || expected == ${numberOfUserKeysExpected}`]);
  t.truthy(validPassword, ['README: Passwords are not equal']);
});

/**
 * Test the GET method 'getUserSignupDate'
 */
test('Test getUserSignupDate method', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(0);

  // 2. Request
  const res = await request(app)
    .get(`/api/v1/user/${userId}/signup_date`)
    .set('Accept', 'application/json');

  // 3. Test
  const numberOfUserKeysValue = Object.keys(res.body.user).length;
  const numberOfUserKeysExpected = 2;

  // Get the dates and format them for comparison
  const dateValue = res.body.user.signup_date;
  const dateExpected = new Date();
  const userSignupDateValue = `${new Date(dateValue).getFullYear()}-${new Date(dateValue).getMonth()}-${new Date(dateValue).getDay()}`;
  const userSignupDateExpected = `${dateExpected.getFullYear()}-${dateExpected.getMonth()}-${dateExpected.getDay()}`;

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(numberOfUserKeysValue, numberOfUserKeysExpected, [`REAMDE: value == ${numberOfUserKeysValue} || expected == ${numberOfUserKeysExpected}`]);
  t.deepEqual(userSignupDateValue, userSignupDateExpected, [`REAMDE: value == ${userSignupDateValue} || expected == ${userSignupDateExpected}`]);
});

/**
 * Test the GET method 'getUserNotificationList'
 */
test('Test getUserNotificationList', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(0);

  // 2. Request
  const res = await request(app)
    .get(`/api/v1/user/${userId}/notification_list`)
    .set('Accept', 'application/json');

  // 3. Test
  const numberOfUserKeysValue = Object.keys(res.body.user).length;
  const numberOfUserKeysExpected = 2;
  const notificationListValue = res.body.user.notification_list;
  const notifcationListExpected = [];

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(numberOfUserKeysValue, numberOfUserKeysExpected, [`REAMDE: value == ${numberOfUserKeysValue} || expected == ${numberOfUserKeysExpected}`]);
  t.deepEqual(notificationListValue, notifcationListExpected, [`REAMDE: value == ${notificationListValue} || expected == ${notifcationListExpected}`]);
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
  const updatedUsernameExpected = 'updatedUsername';

  // 2. Request
  const res = await request(app)
    .put(`/api/v1/user/${userId}/username`)
    .send({ username: updatedUsernameExpected })
    .set('Content-Type', 'application/json');

  // 3. Test
  const updatedUsernameValueObject = await User.findOne({ _id: userId }, 'username').exec();
  const updatedUsernameValue = updatedUsernameValueObject.username;
  const responseValue = res.body.output;
  const responseExpected = 'Success! the username has been saved.';

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(updatedUsernameValue, updatedUsernameExpected, [`REAMDE: value == ${updatedUsernameValue} || expected == ${updatedUsernameExpected}`]);
  t.deepEqual(responseValue, responseExpected, [`REAMDE: value == ${responseValue} || expected == ${responseExpected}`]);
});

/**
 * Test the PUT method 'putUserFirstName'
 */
test('Test putUserFirstName', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(1);
  const updatedFirstNameExpected = 'updateFirstName';

  // 2. Request
  const res = await request(app)
    .put(`/api/v1/user/${userId}/first_name`)
    .send({ first_name: updatedFirstNameExpected })
    .set('Content-Type', 'application/json');

  // 3. Test
  const updatedFirstNameValueObject = await User.findOne({ _id: userId }, 'first_name').exec();
  const updatedFirstNameValue = updatedFirstNameValueObject.first_name;
  const responseValue = res.body.output;
  const responseExpected = 'Success! the first_name has been saved.';

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(updatedFirstNameValue, updatedFirstNameExpected, [`REAMDE: value == ${updatedFirstNameValue} || expected == ${updatedFirstNameExpected}`]);
  t.deepEqual(responseValue, responseExpected, [`REAMDE: value == ${responseValue} || expected == ${responseExpected}`]);
});

/**
 * Test the PUT method 'putUserLastName'
 */
test('Test putUserLastName', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(1);
  const updatedLastNameExpected = 'updatedLastName';

  // 2. Request
  const res = await request(app)
    .put(`/api/v1/user/${userId}/last_name`)
    .send({ last_name: updatedLastNameExpected })
    .set('Content-Type', 'application/json');

  // 3. Test
  const updatedLastNameValueObject = await User.findOne({ _id: userId }, 'last_name').exec();
  const updatedLastNameValue = updatedLastNameValueObject.last_name;
  const responseValue = res.body.output;
  const responseExpected = 'Success! the last_name has been saved.';

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(updatedLastNameValue, updatedLastNameExpected, [`REAMDE: value == ${updatedLastNameValue} || expected == ${updatedLastNameExpected}`]);
  t.deepEqual(responseValue, responseExpected, [`REAMDE: value == ${responseValue} || expected == ${responseExpected}`]);
});

/**
 * Test the PUT method 'putUserEmail'
 */
test('Test putUserEmail', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(1);
  const updatedEmailExpected = 'updatedEmail';

  // 2. Request
  const res = await request(app)
    .put(`/api/v1/user/${userId}/email`)
    .send({ email: updatedEmailExpected })
    .set('Content-Type', 'application/json');

  // 3. Test
  const updatedEmailValueObject = await User.findOne({ _id: userId }, 'email').exec();
  const updatedEmailValue = updatedEmailValueObject.email;
  const responseValue = res.body.output;
  const responseExpected = 'Success! the email has been saved.';

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(updatedEmailValue, updatedEmailExpected, [`REAMDE: value == ${updatedEmailValue} || expected == ${updatedEmailExpected}`]);
  t.deepEqual(responseValue, responseExpected, [`REAMDE: value == ${responseValue} || expected == ${responseExpected}`]);
});

/**
 * Test the PUT method 'putUserPassword'
 */
test('Test putUserPassword', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(1);
  const updatedPasswordExpected = 'updatedPassword';

  // 2. Request
  const res = await request(app)
    .put(`/api/v1/user/${userId}/password`)
    .send({ password: updatedPasswordExpected })
    .set('Content-Type', 'application/json');

  // 3. Test
  const updatedPasswordValueObject = await User.findOne({ _id: userId }, 'password').exec();
  const updatedPasswordValue = updatedPasswordValueObject.password;
  let validPassword = false;
  validPassword = bcrypt.compareSync(updatedPasswordExpected, updatedPasswordValue);
  const responseValue = res.body.output;
  const responseExpected = 'Success! the password has been saved.';

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.truthy(validPassword, ['README: Passwords are not equal']);
  t.deepEqual(responseValue, responseExpected, [`REAMDE: value == ${responseValue} || expected == ${responseExpected}`]);
});

/**
 * Test the PUT method 'putUserLastUserInteraction'
 */
test('Test putUserLastUserInteraction', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(1);
  const updatedLastUserInteractionExpected = new Date();

  // 2. Request
  const res = await request(app)
    .put(`/api/v1/user/${userId}/last_user_interaction`)
    .send({ last_user_interaction: updatedLastUserInteractionExpected })
    .set('Content-Type', 'application/json');

  // 3. Test
  const updatedLastUserInteractionValueObject = await User.findOne({ _id: userId }, 'last_user_interaction').exec();
  const updatedLastUserInteractionValue = updatedLastUserInteractionValueObject.last_user_interaction;
  const responseValue = res.body.output;
  const responseExpected = 'Success! the last_user_interaction has been saved.';

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(updatedLastUserInteractionValue, updatedLastUserInteractionExpected, [`REAMDE: value == ${updatedLastUserInteractionValue} || expected == ${updatedLastUserInteractionExpected}`]);
  t.deepEqual(responseValue, responseExpected, [`REAMDE: value == ${responseValue} || expected == ${responseExpected}`]);
});

/**
 * Test the PUT method 'putUserEmailIsVerified'
 */
test('Test putUserEmailIsVerified', async t => {
  // 1. Setup
  t.plan(3);
  const userId = await getTestUserIdByIndex(1);
  const updatedEmailIsVerifiedExpected = true;

  // 2. Request
  const res = await request(app)
    .put(`/api/v1/user/${userId}/email_is_verified`)
    .send({ email_is_verified: updatedEmailIsVerifiedExpected })
    .set('Content-Type', 'application/json');

  // 3. Test
  const updatedEmailIsVerifiedValueObject = await User.findOne({ _id: userId }, 'email_is_verified').exec();
  const updatedEmailIsVerifiedValue = updatedEmailIsVerifiedValueObject.email_is_verified;
  const responseValue = res.body.output;
  const responseExpected = 'Success! the email_is_verified has been saved.';

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(updatedEmailIsVerifiedValue, updatedEmailIsVerifiedExpected, [`REAMDE: value == ${updatedEmailIsVerifiedValue} || expected == ${updatedEmailIsVerifiedExpected}`]);
  t.deepEqual(responseValue, responseExpected, [`REAMDE: value == ${responseValue} || expected == ${responseExpected}`]);
});

/**
 * Test POST 'postNewUser'
 */
test('Test postNewUser', async t => {
  // 1. Setup
  t.plan(5);
  const firstNameExpected = 'test';
  const lastNameExpected = 'user';
  const emailExpected = 'test.user.added@gmail.com';

  // 2. Request
  const res = await request(app)
    .post('/api/v1/user/')
    .send({ user: { username: 'test.user.added', first_name: firstNameExpected, last_name: lastNameExpected, password: 'password123', email: emailExpected } })
    .set('Content-Type', 'application/json');

  // 3. Test
  const user = await User.findOne({ username: 'test.user.added' }).exec();
  const fistNameValue = user.first_name;
  const lastNameValue = user.last_name;
  const emailValue = user.email;
  const responseValue = res.body.output;
  const responseExpected = 'Success! a new user has been saved.';

  t.is(res.status, 200, [`README: value == ${res.status} || expected == 200`]);
  t.deepEqual(fistNameValue, firstNameExpected, [`REAMDE: value == ${fistNameValue} || expected == ${firstNameExpected}`]);
  t.deepEqual(lastNameValue, lastNameExpected, [`REAMDE: value == ${lastNameValue} || expected == ${lastNameExpected}`]);
  t.deepEqual(emailValue, emailExpected, [`REAMDE: value == ${emailValue} || expected == ${emailExpected}`]);
  t.deepEqual(responseValue, responseExpected, [`REAMDE: value == ${responseValue} || expected == ${responseExpected}`]);
});

// /**
//  * Test DELETE 'deleteUser'
//  */
// test.only('Test deleteUser', async t => {
//   // 1. Setup
//   t.plan(2);
//   const userId = await getTestUserIdByIndex(2);

//   // 2. Request
//   const deleteRes = await request(app).delete(`/api/v1/user/${userId}/`);

//   // 3. Test
//   const getRes = await request(app)
//     .get('/api/v1/users')
//     .set('Accept', 'application/json');

//   t.is(deleteRes.status, 200, [`README: value == ${deleteRes.status} || expected == 200`]);
//   t.deepEqual(getRes.length, users.length - 1, [`REAMDE: value == ${getRes.length} || expected == ${users.length}`]);
// });
