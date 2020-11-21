const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('5fae1c0df3c5fe1ac80c4ddb')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

// const User = require("../models/user");

// exports.getLogin = (req, res, next) => {
// 	// console.log(req.get("Cookie").split(";")[0].trim().split("=")[1] );
// 	// const isLoggedIn =
// 	// 	req.get("Cookie").split(";")[0].trim().split("=")[1] === "true";
// 	// console.log(req.session.isLoggedIn);
// 	// console.log(
// 	// 	"IN this when you press login yo u have a user, so whenever you comeack to login opage console will show truer, otherwiasse undefined. BUT, if you change the browser and still login it will not becausetherer is no pprior knowledge of user"
// 	// );
// 	res.render("auth/login", {
// 		pageTitle: "Login",
// 		path: "/login",
// 		isAuthenticated: false,
// 	});
// };

// exports.postLogin = (req, res, next) => {
// 	// res.setHeader("Set-Cookie", "isloggedIn=true; ");
// 	User.findById("5fae1c0df3c5fe1ac80c4ddb")
// 		.then((user) => {
// 			req.session.isLoggedIn = true;
// 			req.session.user = user;
// 			res.redirect("/");
// 		})
// 		.catch((err) => console.log(err));
// };
// // res.setHeader("Set-Cookie", "isloggedIn=true; Max-Age=10"); => cookie live upto 10s only i.e. no is is seconds
// // res.setHeader("Set-Cookie", "isloggedIn=true; Expires= "); => cookie live upto given date only { format can be searched }
// // res.setHeader("Set-Cookie", "isloggedIn=true; Secure"); => cookie does not allow http server to acces coookie
// // res.setHeader("Set-Cookie", "isloggedIn=true; HttpOnly"); => cookie omly allow http server to access coookie

// exports.postLogout = (req, res, next) => {
// 	req.session.destroy((err) => {
// 		console.log(err);
// 		res.redirect("/");
// 	});
// };
