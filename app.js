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
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // for styling , we give path to file for html

app.use((req, res, next) => {
	User.findById("5fae1c0df3c5fe1ac80c4ddb")
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => {
			console.log(err);
		});
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
// 	app.listen(3000);
// });

mongoose
	.connect(
		"mongodb+srv://chakshu:chakshu@cluster0.fjlpu.mongodb.net/shop?retryWrites=true&w=majority"
	)
	.then((result) => {
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					name: "Demon",
					email: "demon@gmail.com",
					cart: {
						items: [],
					},
				});
				user.save();
			}
		});

		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});
