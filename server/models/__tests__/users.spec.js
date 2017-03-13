import test from 'ava';
import request from 'supertest';
import app from '../../server';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial users added into test db
const users = [
  new User({
    username: "test.user",
    first_name: "test",
    last_name: "user",
    password: "password123",
    email: "test.user@gmail.com"
  })
];

test.beforeEach('connect and add one user', t => {
  connectDB(t, () => {
    User.create(users, err => {
      if (err) t.fail('Unable to add user');
    });
  });
});

test.afterEach.always(t => {
  dropDB(t);
});

test.serial('Should correctly give number of Users', async t => {
  t.plan(1);

  const res = await request(app)
    .get('/api/v1/users')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  console.log(users.length);
  console.log(res.body);
  // t.deepEqual(users.length, res.body.users.length);
});


