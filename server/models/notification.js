import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user_id: {},
  notification_type: { type: String, required: true },
  notification_is_unread: { type: Boolean, default: true, required: true },
  created_date: { type: Date, default: Date.now, required: true },
  date_modified: { type: Date, default: Date.now, required: true },
});

export default mongoose.model('Notifications', notificationSchema);
