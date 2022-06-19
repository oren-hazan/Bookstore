import mongoose from 'mongoose';
import environments from '../../config/environments.js';

const MONGO_URL = environments.MONGO_URL;

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(MONGO_URL);
		console.log('MongoDB database connected!');
	} catch {
		console.log('MongoDB database connection error!');
		process.exit(1);
	}
};

export default connectToMongoDB;
