const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fireshaw';

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        bufferCommands: false,
      })
      .then((m) => {
        console.log(`[MongoDB Connected]: ${m.connection.host}`);
        return m;
      })
      .catch((err) => {
        console.error(`[MongoDB Connection Error]: ${err.message}`);
        cached.promise = null;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
