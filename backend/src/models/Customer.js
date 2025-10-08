import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  plan: {
    type: String,
    enum: ['Basic', 'Pro', 'Enterprise'],
    default: 'Basic'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  revenue: {
    type: Number,
    default: 0
  },
  joined: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);
