const path = require("path");

const bodyParser = require("body-parser");
const express = require("express");

const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // for styling , we give path to file for html

app.use((req, res, next) => {
	User.findById("5fa65b89d13d54d819090f76")
		.then((user) => {
			req.user = new User(user.name, user.email, user.cart, user._id);
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
// 	app.listen(3000);
// });

mongoose
	.connect(
		"mongodb+srv://chakshu:chakshu@cluster0.fjlpu.mongodb.net/shop?retryWrites=true&w=majority"
	)
	.then((result) => {
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});
