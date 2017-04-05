// External imports
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Local imports
import Notification from './notification';


const Schema = mongoose.Schema;

// TODO: Add 'unique: true' to email and username
// TODO: Add 'trim: true' to username, first_name, last_name, email
const userSchema = new Schema({
  username: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  email_is_verified: { type: Boolean, default: false, required: true },
  signup_date: { type: Date, default: Date.now, required: true },
  last_user_interaction: { type: Date, default: Date.now, required: true },
  social_media: [
    {
      social_title: { type: String },
      date_added: { type: Date, default: Date.now },
      date_modified: { type: Date, default: Date.now },
      auth_token: { type: String },
    },
  ],
  notification_list: [
    { type: mongoose.Schema.Types.ObjectId, ref: Notification },
  ],
  notification_preferences: {
    newsletter: { type: Boolean, default: true },
    updates: { type: Boolean, default: true },
    password_reminder: { type: Boolean, default: true },
    backup_email_reminder: { type: Boolean, default: true },
  },
  security: {
    two_factor_auth: { type: Boolean, default: false },
    backup_email: { type: String, default: null },
    verification_code: { type: Number, default: null },
  },
});

// Authenticate input against database documents
userSchema.statics.authenticate = function(username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        console.error('Erro with username', err);
        return callback(err);
      } else if (!user) {
        console.log('Invalid username');
        const error = new Error('User not found.');
        error.status = 401;
        return callback(error);
      }
      bcrypt.compare(password, user.password, function(error, result) {
        if (result === true) {
          return callback(null, user);
        }
        return callback();
      });
    });
};

// Has password before saving to database
userSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    return next();
  });
});

const User = mongoose.model('User', userSchema);
export default mongoose.model('User', userSchema);
