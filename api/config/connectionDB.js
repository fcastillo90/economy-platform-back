import mongoose from 'mongoose';

const mongoConnection = async () => {
  const connection = await mongoose.connect(
    process.env.URL_MONGO,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    err => {
      if (err) console.log('MONGO ERR:', err);
      else console.log('DB CONNECTED!');
    }
  );
  return connection;
};

const connectionDB = {
  mongoConnection
};

export default connectionDB;
