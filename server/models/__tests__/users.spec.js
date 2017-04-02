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

test.before('connect to the database', async t => {
  User.remove({}, err => {
    if (err) console.log('Model not removed.');
  });
  await mongooseInstance.createConnection('mongodb://localhost:27017/social-pulse-test');
  await User.create(users, err => {
    if (err) console.error('Save failed.', err);
    else console.log('Saved the user.');
  });
});

test.after(t => {
  User.remove({}, err => {
    if (err) console.log('Model not removed.');
  });

  mongooseInstance.disconnect(err => {
    if (err) console.log(err);
  });
});

test.serial('Should correctly give number of Users', async t => {
  console.log('test 1');
  t.plan(2);

  const res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(users.length, res.body.users.length);
});

test.serial('Test of getUserId, should return correct userId', async t => {
  console.log('test 2');
  t.plan(2);
  const res1 = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');
  console.log(res1.body);

  const res = await request(app)
    .get('/api/v1/user/test.user')
    .set('Accept', 'application/json');
  t.is(res1.status, 200);
  t.deepEqual(res1.body.users[0]._id, res.body.user._id);
});

/**
test.serial('Test of getUserUsername, should return correct username', async t => {
  console.log('test 3');
  t.plan(2);
  const uname = 'test.user';
  const res1 = await request(app)
    .get('/api/v1/user/test.user')
    .set('Accept', 'application/json');

  console.log('/api/v1/user/' + res1.body.user._id + '/username');
  const res = await request(app)
    .get('/api/v1/user/' + res1.body.user._id + '/username')
    .set('Accept', 'application/json');
  console.log(res.body.username);
  t.is(res1.status, 200);
  t.deepEqual(res.body.username, 'test.user');
});*/
