const Product = require("../models/product");
const Order = require("../models/order");
const { Logger } = require("mongodb");

// to get all products
exports.getProducts = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "Shop",
				path: "/products",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};
// to get single product
exports.getProduct = (req, res, next) => {
	const prodId = req.params.productId;
	// Product.findAll({ where: { id: prodId } })
	// 	.then((products) => {
	// 		res.render("shop/product-details", {
	// 			product: products[0],
	// 			pageTitle: products[0].title,
	// 			path: "/products",
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	Product.findById(prodId)
		.then((product) => {
			res.render("shop/product-details", {
				product: product,
				pageTitle: product.title,
				path: "/products",
			});
		})
		.catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
	Product.fetchAll()
		.then((products) => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.getCart()
		.then((products) => {
			res.render("shop/cart", {
				pageTitle: "Your Cart",
				path: "/cart",
				products: products,
			});
		})
		.catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId)
		.then((product) => {
			return req.user.addToCart(product);
		})
		.then((result) => {
			console.log(result);
			res.redirect("/cart");
		})
		.catch((err) => console.log(err));
	// let fetchedCart;
	// let newQuantity = 1;
	// req.user
	// 	.getCart()
	// 	.then((cart) => {
	// 		fetchedCart = cart;
	// 		return cart.getProducts({ where: { id: prodId } });
	// 	})
	// 	.then((products) => {
	// 		let product;
	// 		if (products.length > 0) {
	// 			product = products[0];
	// 		}

	// 		if (product) {
	// 			const oldQuantity = product.cartItem.quantity;
	// 			newQuantity = oldQuantity + 1;
	// 			return product;
	// 		}
	// 		return Product.findByPk(prodId);
	// 	})
	// 	.then((product) => {
	// 		return fetchedCart.addProduct(product, {
	// 			through: { quantity: newQuantity },
	// 		});
	// 	})

	// 	.then(() => {
	//
	// 	})
	// 	.catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	req.user
		.getCart()
		.then((cart) => {
			return cart.getProducts({ where: { id: prodId } });
		})
		.then((products) => {
			const product = products[0];
			return product.cartItem.destroy();
		})
		.then((result) => {
			res.redirect("/cart");
		})
		.catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
	let fetchedCart;
	req.user
		.getCart()
		.then((cart) => {
			fetchedCart = cart;
			return cart.getProducts();
		})
		.then((products) => {
			req.user
				.createOrder()
				.then((order) => {
					return order.addProducts(
						products.map((product) => {
							product.orderItem = { quantity: product.cartItem.quantity };
							return product;
						})
					);
				})
				.catch((err) => console.log(err));
		})
		.then((result) => {
			return fetchedCart.setProducts(null);
		})
		.then((result) => {
			res.redirect("/orders");
		})
		.catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders({ include: ["products"] })
		.then((orders) => {
			res.render("shop/orders", {
				pageTitle: "Your Orders",
				path: "/orders",
				orders: orders,
			});
		})
		.catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
	res.render("shop/checkout", {
		prods: products,
		pageTitle: "Your CheckOut",
		path: "/checkout",
	});
};
