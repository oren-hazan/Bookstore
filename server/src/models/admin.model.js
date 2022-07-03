import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import environments from '../../config/environments.js';

const adminSchema = new mongoose.Schema({
	firstName: {
		type: String,
		trim: true,
		lowercase: true,
		required: true,
	},
	lastName: {
		type: String,
		trim: true,
		lowercase: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
		unique: true,
		validate(value) {
			if (!isEmail(value)) throw new Error('Email is invalid');
		},
	},
	password: {
		type: String,
		trim: [true, 'Password is required'],
		required: true,
		minLength: [8, 'Password must be at least 8 characters'],
		validate(value) {
			if (
				!isStrongPassword(value, {
					minNumber: 1,
					minUppercase: 0,
					minSymbols: 0,
				})
			) {
				throw new Error('Password is not strong enough!');
			}
		},
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

adminSchema.pre('save', async function (next) {
	const admin = this;
	if (admin.isModified('password')) {
		admin.password = await bcrypt.hash(admin.password, 8);
	}
	next();
});

adminSchema.methods.generateAuthToken = async function () {
	const admin = this;
	const token = jwt.sign({ _id: admin._id }, environments.TOKEN_SECRET);

	admin.tokens.push({ token: token });
	await admin.save();

	return token;
};

adminSchema.statics.findAdminByEmailAndPassword = async (email, password) => {
	const admin = await Admin.findOne({ email: email });
	if (!admin) throw new Error('Unable to login!');

	const isPasswordMatch = await bcrypt.compare(password, admin.password);
	if (!isPasswordMatch) throw new Error('Unable to login!');

	return admin;
};

adminSchema.methods.toJSON = function () {
	const admin = this;
	const adminObj = admin.toObject();
	delete adminObj.password;
	delete adminObj.tokens;
	delete adminObj.__v;

	return adminObj;
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
