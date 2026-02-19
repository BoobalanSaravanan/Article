import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventType: { type: String, required: true, index: true },
  page: { type: String, required: true },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', default: null },
  scrollDepth: { type: Number, default: 0 },
  timeOnPage: { type: Number, default: 0 },
  sessionId: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now }
});

export const Event = mongoose.model('Event', eventSchema);
