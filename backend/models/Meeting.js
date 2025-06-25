const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time in HH:MM format']
  },
  duration: {
    type: Number,
    required: true,
    enum: [15, 30, 45, 60],
    default: 30
  },
  topic: {
    type: String,
    required: [true, 'Topic is required'],
    trim: true
  },
  attendeeEmail: {
    type: String,
    required: [true, 'Attendee email is required'],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  googleEventId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better query performance
meetingSchema.index({ date: 1 });
meetingSchema.index({ attendeeEmail: 1 });
meetingSchema.index({ googleEventId: 1 }, { unique: true });

module.exports = mongoose.model('Meeting', meetingSchema);