import dotenv from 'dotenv';

dotenv.config();

const environments = {
	PORT: process.env.PORT,
	MONGO_URL: process.env.MONGO_URL,
	TOKEN_SECRET: process.env.TOKEN_SECRET,
};

export default environments;
