import User from '../models/user';

// ///////////////////////////////// POST Requests ///////////////////////////////////

export function checkAuth(req, res, next) {
  if (!req.session.userId) {
    res.json({ status: 'Error.', isValid: false });
    return next();
  }
  res.json({ status: 'Success.', isValid: true });
  return next();
}

export function login(req, res, next) {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, (error, user) => {
      // Check for errors
      if (error || !user) {
        if (error.name === 'username') {
          const err = new Error('Invalid username.');
          err.name = 'username';
          err.status = 401;
          return next(err);
        } else if (error.name === 'password') {
          const err = new Error('Invalid password.');
          err.name = 'password';
          err.status = 401;
          return next(err);
        }
        const err = new Error('Invalid username or password.');
        err.name = 'general';
        err.status = 401;
        return next(err);
      }

      // Respond successfully
      req.session.userId = user._id;
      res.json({ status: 'Success.', userId: user._id });
      return next();
    });
  } else {
    const err = new Error('Username and password are required.');
    err.name = 'general';
    err.status = 401;
    next(err);
  }
}

export function logout(req, res, next) {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return next(err);
      }
      return res.redirect('/login');
    });
  }
}
