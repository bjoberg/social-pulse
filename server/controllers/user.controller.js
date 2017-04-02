'use strict';

import User from '../models/user';

/********************************** GET Requests **********************************/

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

/**
 * Get a specific userId based on username
 * @param req
 * @param res
 * @returns void
 */
export function getUserId(req, res) {
  User.findOne({ username: req.params.username }, '_id').exec((err, user) => {
    getUserHelper(err, user, req, res);
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

/********************************** PUT Requests **********************************/

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
    let customError = new Error('Bad request');
    customError.status = 400;

    res.status(400).send(customError);
  } else {
    user[request] = req.body[request];

    user.save(function(err, saved) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ output: 'Success! the ' + request + ' has been save with value ' + saved });
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

/********************************** POST Requests **********************************/

/**
 * Create a new
 * @param req
 * @param res
 * @returns void
 */
export function postNewUser(req, res) {
  if (!req.body.user.username || !req.body.user.first_name || !req.body.user.last_name || !req.body.user.password || !req.body.user.email) {
    res.status(403).end();
  } else {
    const newUser = new User(req.body.user);

    newUser.save((err, saved) => {
      if (err) { res.status(500).send(err); }
      res.json({ user: saved });
      res.status(200).end();
    });
  }
}

/********************************** DELETE Requests **********************************/

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

    user.remove((err, saved) => {
      if (err) { res.status(500).send(err); }
      res.json({ user: saved });
      res.status(200).end();
    });
  });
}
