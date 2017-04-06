import User from '../models/user';

// ///////////////////////////////// POST Requests ///////////////////////////////////

export function login(req, res, next) {
  if (req.body.username && req.body.password) {
    console.log('in if');
    User.authenticate(req.body.username, req.body.password, function (error, user) {
      if (error || !user) {
        const err = new Error('Invalid username or password');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        res.json({ output: 'Hello.' });
        console.log("logged in.");
      }
    });
  } else {
    const err = new Error('Username and password are required.');
    err.status = 401;
    next(err);
  }
}

export function signUp(req, res, next) {
  console.log('sign_up');
}

export function logout(req, res, next) {
  console.log('logout');
}
