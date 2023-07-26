import { Schema, model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { TUser } from '../../../../domain/entity/user';

const userSchema = new Schema<TUser>({
  id: {
    type: String,
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

export default model('Users', userSchema);
