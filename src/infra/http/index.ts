import app from './server';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Currently listening to port: http://localhost:${PORT}`);
});
