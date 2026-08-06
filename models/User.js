import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  contact: { type: String, required: true, unique: true },
  gender: { type: String },
  state: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);