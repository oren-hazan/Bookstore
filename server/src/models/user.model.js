import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import environments from '../../config/environments.js';
import Cart from '../models/cart.model.js'

const userSchema = new mongoose.Schema(
	{
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
	},
	{
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
);

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.methods.createCart = async function () {
	const user = this
	const cart = new Cart({
		ownerID: user._id,
		books: [],
	});
	await cart.save();

	return cart
}

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id }, environments.TOKEN_SECRET);

	user.tokens.push({ token: token });
	await user.save();

	return token;
};

userSchema.statics.findUserByEmailAndPassword = async (email, password) => {
	const user = await User.findOne({ email: email });
	if (!user) throw new Error('Unable to login!');

	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) throw new Error('Unable to login!');

	return user;
};

userSchema.methods.toJSON = function () {
	const user = this;
	const userObj = user.toObject();
	delete userObj.password;
	delete userObj.tokens;
	delete userObj.__v;

	return userObj;
};

userSchema.virtual('myCart', {
	ref: 'Cart',
	localField: '_id',
	foreignField: 'ownerID',
});

const User = mongoose.model('User', userSchema);

export default User;
