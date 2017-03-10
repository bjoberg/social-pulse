import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// NOTE: Figure out how to connect to user
const socialMediaSchema = new Schema({
  user_id: {},
  social_title: {type: 'String', required: true},
  date_added: {type: 'Date', default: Date.now, required: true},
  date_modified: {type: 'Date', default: Date.now, required: true},
  auth_token: {type: 'String', required: true}
});

export default mongoose.model('Social_Media', socialMediaSchema);