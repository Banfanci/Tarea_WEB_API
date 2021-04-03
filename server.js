const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER EXCEPTION! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./index');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App runnin on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
