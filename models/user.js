const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {
	constructor(username, email, cart, id) {
		this.name = username;
		this.email = email;
		this.cart = cart; // {items: {}}
		this._id = id;
	}
	save() {
		const db = getDb();

		return db
			.collection("users")
			.insertOne(this)
			.then((result) => {
				console.log(resault);
			})
			.catch((err) => console.log(err));
	}

	addToCart(product) {
		// const cartProduct = this.cart.findIndex(cp=>{
		// 	return cp._id ===product._id;
		// })
		const updatedCart = {
			items: [{ productId: new ObjectId(product._id), quantity: 1 }],
		};
		const db = getDb();
		return db
			.collection("users")
			.updateOne(
				{ _id: new ObjectId(this._id) },
				{ $set: { cart: updatedCart } }
			);
	}

	static findById(userId) {
		const db = getDb();

		return db
			.collection("users")
			.findOne({ _id: new ObjectId(userId) })
			.then((user) => {
				console.log(user);
				return user;
			})
			.catch((err) => {
				console.log(err);
			});

		//  If you dont want to find only one user
		// db.collection("users")
		// 	.find({ _id: new ObjectId(userId) })
		// 	.next();
	}
}
module.exports = User;
