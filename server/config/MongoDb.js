import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

const connectDatabase = async () => {
    let mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
        const mongod = await MongoMemoryServer.create();
        mongoUri = mongod.getUri(); // Use in-memory database if no URI is provided
      }
    
      await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log(`MongoDB connected: ${mongoUri}`);
};

export default connectDatabase;