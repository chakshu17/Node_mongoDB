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
};

exports.postCartDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	req.user
		.deleteItemFromCart(prodId)
		.then((result) => {
			res.redirect("/cart");
		})
		.catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
	let fetchedCart;
	req.user
		.addOrder()
		.then((result) => {
			res.redirect("/orders");
		})
		.catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
	req.user
		.getOrders()
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
