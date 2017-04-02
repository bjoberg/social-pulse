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
  User.remove({}, err => {
    if (err) console.log('Model not removed.');
  });
  await mongooseInstance.createConnection('mongodb://localhost:27017/social-pulse-test');
  await User.create(users, err => {
    if (err) console.error('Save failed.', err);
    else console.log('Saved the user.');
  });
});

test.afterEach(t => {
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

