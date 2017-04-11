import User from '../models/user';

// ///////////////////////////////// POST Requests ///////////////////////////////////

export function login(req, res, next) {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, (error, user) => {
      // Check for errors
      if (error || !user) {
        if (error.name === 'User not found') {
          console.log(error.name);
          const err = new Error('User not found.');
          err.status = 401;
          return next(err);
        } else if (error.name === 'Invalid password') {
          console.log(error.name);
          const err = new Error('Invalid password.');
          err.status = 401;
          return next(err);
        }
        console.log(error.name);
        const err = new Error('Invalid username or password.');
        err.status = 401;
        return next(err);
      }

      // Respond successfully
      console.log('Success.');
      req.session.userId = user._id;
      res.json({ output: 'Hello.' });
      return next();
    });
  } else {
    const err = new Error('Username and password are required.');
    err.message = 'Username and password are required';
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
