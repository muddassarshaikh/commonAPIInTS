import mongoose from 'mongoose';
import config from '../../config';

mongoose.connect(config.mongoDBConnectionString, { useNewUrlParser: true });

const db = mongoose.connection;
// const db = mongoose.createConnection(mongoDBConnectionString);

db.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

db.on('connected', function () {
  console.log('Mongoose connected ');
});

db.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

//export the module
export default db;
