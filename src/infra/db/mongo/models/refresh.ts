import { Schema, model } from 'mongoose';

type TRefreshUser = {
  userId: String;
  token: string;
  createdAt: Date;
};

const refreshSchema = new Schema<TRefreshUser>({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('refresh', refreshSchema);
