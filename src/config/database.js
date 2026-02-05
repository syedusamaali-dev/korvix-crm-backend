import mongoose from 'mongoose';

// Cache the connection across serverless function warm executions
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      // Prevents buffer build-ups if connection drops temporarily
      bufferCommands: false,
    });

    isConnected = connection.connections[0].readyState;
    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    // Throw the error instead of calling process.exit(1)
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default connectDB;