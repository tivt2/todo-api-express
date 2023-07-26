import mongoose, { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

const userSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.UUID,
    default: () => uuid(),
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Users', userSchema);
