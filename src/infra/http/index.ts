import mongoose from 'mongoose';
import app from './server';

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  console.log('Connection Open to mongoDB');
  app.listen(PORT, () => {
    console.log(`Currently listening to port: http://localhost:${PORT}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});
