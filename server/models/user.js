import mongoose from 'mongoose';
import socialMediaSchema from './socialMedia';

const Schema = mongoose.Schema;

// NOTE: ommitted sessionId
const userSchema = new Schema({
  username: {type: 'String', required: true},
  first_name: {type: 'String', required: true},
  last_name: {type: 'String', required: true},
  password: {type: 'String', required: true},
  email: {type: 'String', required: true},
  verified_email: {type: 'Boolean', default: false, required: true},
  signup_date: {type: 'Date', default: Date.now, required: true},
  last_user_interaction: {type: 'Date', default: Date.now, required: true},
  social_media: [socialMediaSchema],
  notification_list: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}
  ],
  notification_preferences: {
    newsletter: {type: 'Boolean', default: true, required: true},
    updates: {type: 'Boolean', default: true, required: true},
    password_reminder: {type: 'Boolean', default: true, required: true},
    backup_email_reminder: {type: 'Boolean', default: true, required: true}
  },
  security: {
    two_factor_auth: {type: 'Boolean', default: false, required: true},
    backup_email: {type: 'String', default: null, required: true},
    verification_code: {type: 'Number', default: null, required: true}
  }
});

export default mongoose.model('User', userSchema);