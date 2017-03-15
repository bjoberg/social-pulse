import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// NOTE: ommitted sessionId
const userSchema = new Schema({
  username: {type: 'String', required: true},
  first_name: {type: 'String', required: true},
  last_name: {type: 'String', required: true},
  password: {type: 'String', required: true},
  email: {type: 'String', required: true},
  email_is_verified: {type: 'Boolean', default: false, required: true},
  signup_date: {type: 'Date', default: Date.now, required: true},
  last_user_interaction: {type: 'Date', default: Date.now, required: true},
  social_media: [
    {
      social_title: {type: 'String'},
      date_added: {type: 'Date', default: Date.now},
      date_modified: {type: 'Date', default: Date.now},
      auth_token: {type: 'String'}
    }
  ],
  notification_list: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}
  ],
  notification_preferences: {
    newsletter: {type: 'Boolean', default: true},
    updates: {type: 'Boolean', default: true},
    password_reminder: {type: 'Boolean', default: true},
    backup_email_reminder: {type: 'Boolean', default: true}
  },
  security: {
    two_factor_auth: {type: 'Boolean', default: false},
    backup_email: {type: 'String', default: null},
    verification_code: {type: 'Number', default: null}
  }
});

export default mongoose.model('User', userSchema);