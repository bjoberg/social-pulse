import User from '../models/user';

// ///////////////////////////////// GET Requests ///////////////////////////////////

/**
 * Return the User object based on the specific User object field that is being requested.
 * @param request (string) is the field within the User object being updated
 * @param err
 * @param req
 * @param res
 * @returns void
 */
function getUserHelper(err, user, req, res) {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json({ user });
  }
}

//// GetOauth
export function getOauth(req, res){
  User.findOne({ _id: req.params.userId }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // oauth logic

      
    }
  });
}

////////////////////


/**
 * Get all users
 * @param req
 * @param res
 * @returns void
 */
export function getUsers(req, res) {
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ users });
    }
  });
}

export function getProfile(req, res, next) {
  // Check to make sure user is logged in
  if (!req.session.userId) {
    const error = new Error('You are not authorized to view this page');
    error.name = 'unauthorized';
    error.status = 403;
    return next(error);
  }

  // User is logged in
  User.findById(req.session.userId)
    .exec((error, user) => {
      if (error) {
        return next(error);
      }
      res.json({ user });
      // return next();
    });
}

/**
 * Get a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  User.findOne({ _id: req.params.userId }).exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get username for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserUsername(req, res) {
  User.findOne({ _id: req.params.userId }, 'username').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get first_name for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserFirstName(req, res) {
  User.findOne({ _id: req.params.userId }, 'first_name').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get last_name for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserLastName(req, res) {
  User.findOne({ _id: req.params.userId }, 'last_name').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get password for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserPassword(req, res) {
  User.findOne({ _id: req.params.userId }, 'password').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get email for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserEmail(req, res) {
  User.findOne({ _id: req.params.userId }, 'email').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get email_is_verified for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserEmailIsVerified(req, res) {
  User.findOne({ _id: req.params.userId }, 'email_is_verified').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get signup_date for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserSignupDate(req, res) {
  User.findOne({ _id: req.params.userId }, 'signup_date').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get last_user_interaction for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserLastUserInteraction(req, res) {
  User.findOne({ _id: req.params.userId }, 'last_user_interaction').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get social for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserSocial(req, res) {
  User.findOne({ _id: req.params.userId }, 'social_media').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get notification_list for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserNotificationList(req, res) {
  User.findOne({ _id: req.params.userId }, 'notification_list').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get notification_preferences for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserNotificationPreferences(req, res) {
  User.findOne({ _id: req.params.userId }, 'notification_preferences').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

/**
 * Get security for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function getUserSecurity(req, res) {
  User.findOne({ _id: req.params.userId }, 'security').exec((err, user) => {
    getUserHelper(err, user, req, res);
  });
}

// ///////////////////////////////// PUT Requests ///////////////////////////////////

/**
 * Update the User object based on the specific User object field that is being updated.
 * @param request (string) is the field within the User object being updated
 * @param err
 * @param req
 * @param res
 * @returns void
 */
function putUserHelper(request, err, user, req, res) {
  if (err) {
    res.status(500).send(err);
  } else if (!req.body[request]) {
    const customError = new Error('Bad request');
    customError.status = 400;

    res.status(400).send(customError);
  } else {
    user[request] = req.body[request];

    user.save(() => {
      if (err) {
        const customError = new Error('Bad request');
        customError.status = 500;
        res.status(500).send(customError);
      } else {
        res.json({ output: `Success! the ${request} has been saved.` });
      }
    });
  }
}

/**
 * PUT username for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function putUserUsername(req, res) {
  User.findOne({ _id: req.params.userId }, 'username').exec((err, user) => {
    putUserHelper('username', err, user, req, res);
  });
}

/**
 * PUT fist_name for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function putUserFirstName(req, res) {
  User.findOne({ _id: req.params.userId }, 'first_name').exec((err, user) => {
    putUserHelper('first_name', err, user, req, res);
  });
}

/**
 * PUT last_name for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function putUserLastName(req, res) {
  User.findOne({ _id: req.params.userId }, 'last_name').exec((err, user) => {
    putUserHelper('last_name', err, user, req, res);
  });
}

/**
 * PUT password for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function putUserPassword(req, res) {
  User.findOne({ _id: req.params.userId }, 'password').exec((err, user) => {
    putUserHelper('password', err, user, req, res);
  });
}

/**
 * PUT email for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function putUserEmail(req, res) {
  User.findOne({ _id: req.params.userId }, 'email').exec((err, user) => {
    putUserHelper('email', err, user, req, res);
  });
}

/**
 * PUT email_is_verified for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function putUserEmailIsVerified(req, res) {
  User.findOne({ _id: req.params.userId }, 'email_is_verified').exec((err, user) => {
    putUserHelper('email_is_verified', err, user, req, res);
  });
}

/**
 * PUT last_user_interaction for a specific user based on userId
 * @param req
 * @param res
 * @returns void
 */
export function putUserLastUserInteraction(req, res) {
  User.findOne({ _id: req.params.userId }, 'last_user_interaction').exec((err, user) => {
    putUserHelper('last_user_interaction', err, user, req, res);
  });
}

// ///////////////////////////////// POST Requests ///////////////////////////////////

/**
 * Create a new
 * @param req
 * @param res
 * @returns void
 */
export function postNewUser(req, res, next) {
  // Check to make sure the user does not already exist
  User.findOne({ username: req.body.user.username }).exec((err, user) => {
    if (user) {
      const customError = new Error('Username has already been taken.');
      customError.name = 'username';
      customError.status = 409;
      return next(customError);
    }
    if (!req.body.user.username || !req.body.user.first_name || !req.body.user.last_name || !req.body.user.password || !req.body.user.email) {
      const customErr = new Error('Invalid username or password.');
      customErr.name = 'general';
      customErr.status = 403;
      return next(customErr);
    } else {
      // Reg expression for valid email address
      const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const newUser = new User(req.body.user);

      // Check that the email is of valid format
      if (!emailReg.test(req.body.user.email)) {
        const customError = new Error('Invalid email.');
        customError.name = 'email';
        customError.status = 406;
        return next(customError);
      }
      newUser.save((err, saved) => {
        if (err) { res.status(500).send(err); }
        req.session.userId = saved._id;
        res.json({ output: 'Success! a new user has been saved.' });
        res.status(200).end();
      });
    }
  });
}

// ///////////////////////////////// DELETE Requests ///////////////////////////////////

/**
 * Delete a user
 * @param req
 * @param res
 * @returns void
 */
export function deleteUser(req, res) {
  User.findOne({ _id: req.params.userId }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    }

    user.remove(err, saved => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ user: saved });
        res.status(200).end();
      }
    });
  });
}
