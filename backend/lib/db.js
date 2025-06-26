// lib/db.js
const mongoose = require('mongoose');

let isConnected = false;

const connectToDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ DB connection error:', error);
    throw error;
  }
};

module.exports = connectToDB;
