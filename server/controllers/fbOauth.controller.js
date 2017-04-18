/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import User from '../models/user';
import axios from 'axios';

function validateSession(req, next) {
  if (!req.session.userId) {
    const err = new Error('Invalid session id');
    err.name = 'session';
    err.status = 401;
    next(err);
    return false;
  }
  return true;
}

export function getOauth(req, res, next) {
  if (validateSession(req, next)) {
    User.findOne({ _id: req.session.userId }, 'social_media').exec((err, user) => {
      if (err || user === null) {
        res.status(500).send(err);
        return next(err);
      }

      // Look for the Facebook auth_token
      for (let i = 0; i < user.social_media.length; i++) {
        if (user.social_media[i].social_title === 'Facebook') {
          res.json({ token: user.social_media[i].auth_token });
        }
      }

      // Continue on to the next pice of middleware
      next();
    });
  }
}

export function putOauth(req, res, next) {
  if (validateSession(req, next)) {
    User.findOne({ _id: req.session.userId }, 'social_media').exec((err, user) => {
      if (err || user === null) {
        res.status(500).send(err);
        return next(err);
      }

      // Make fb api request
      const appId = (process.env.NODE_ENV === 'production') ? '242627689545301' : '289287891496885';
      const appSecret = (process.env.NODE_ENV === 'production') ? '32574e9314aa8383a925ea1e93995f63' : '7e0e12c1935200d4884c9a353d9d4f6f';
      const appShortLivedToken = req.body.token;

      axios.get(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${appShortLivedToken}`).then(response => {
        let isNotUpdated = true;

        for (let i = 0; i < user.social_media.length; i++) {
          if (user.social_media[i].social_title === 'Facebook') {
            user.social_media[i].auth_token = response.data.access_token;
            isNotUpdated = false;
          }
        }

        if (isNotUpdated) {
          user.social_media.push({
            social_title: 'Facebook',
            date_added: new Date,
            date_modified: new Date,
            auth_token: response.data.access_token,
          });
        }

        user.save(() => {
          if (err) {
            const customError = new Error('Bad request');
            customError.status = 500;
            res.status(500).send(customError);
          } else {
            res.json({ output: 'Success! Token updated' });
          }
        });
      }).catch(error => {
        console.log(error);
      });
    });
  }
}
