/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import User from '../models/user';
import axios from 'axios';

const appId = '1391085770956859';
const appSecret = '8073aeed7909ed09963071bf4e080ad2';
const appShortLivedToken = '';

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

      // Return long term user oAuth auth_token
      // TODO: res.json({ user });
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
      console.log('about to make request');
      console.log(req.body);

      axios.get(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&amp;client_id=${appId}&amp;client_secret=${appSecret}&amp;fb_exchange_token=${appShortLivedToken}`).then(response => {
        console.log('In the request callback');
        console.log(response);
        // user.social_media.push({
        //   social_title: 'Facebook',
        //   date_added: new Date,
        //   date_modified: new Date,
        //   auth_token: data.oAuth,
        // }
        // );
      }).catch(error => {
        console.log(error);
      });

      // console.log('about to push');
      // user.social_media.push({
      //   social_title: 'Facebook',
      //   date_added: new Date,
      //   date_modified: new Date,
      //   auth_token: '',
      // }
      // );

      // console.log('updated social_media == ' + user);

      // user.save(() => {
      //   if (err) {
      //     const customError = new Error('Bad request');
      //     customError.status = 500;
      //     res.status(500).send(customError);
      //   } else {
      //     res.json({ output: `Success! the ${request} has been saved.` });
      //   }
      // });
    });
  }
}
