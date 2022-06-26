import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
	{
		ownerID: {
			type: mongoose.SchemaTypes.ObjectId,
			required: true,
			ref: 'User'
		},
		books: [
			{
				bookID: {
					type: mongoose.SchemaTypes.ObjectId,
					required: true,
					ref: 'Book',
				},
			},
		],
	},
);

cartSchema.methods.toJSON = function () {
	const cart = this;

	const cartObj = cart.toObject();
	delete cartObj.__v;

	return cartObj;
};

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
