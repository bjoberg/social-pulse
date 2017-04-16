import app from '../../server';
import User from '../models/user';

export function putOauth(req, res, next) {
  if (!req.session.userId) {
    const err = new Error('Invalid session id');
    err.name = 'session';
    err.status = 401;
    return next(err);
  }

  User.findOne({ _id: req.params.userId }, 'social').exec((err, user) => {
    res.json({ user });
    return next();
  });
}
