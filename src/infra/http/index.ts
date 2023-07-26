import connectDB from '../db/mongo/db';
import { UserRepository } from '../db/user-repository';
import dotenv from 'dotenv';
dotenv.config();

const userRepo = new UserRepository();

(async () => {
  connectDB();
  const user = await userRepo.getUserByUsername('admin');
  console.log(user);
})();
