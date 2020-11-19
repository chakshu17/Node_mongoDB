exports.getLogin = (req, res, next) => {
	// console.log(req.get("Cookie").split(";")[0].trim().split("=")[1] );
	// const isLoggedIn =
	// 	req.get("Cookie").split(";")[0].trim().split("=")[1] === "true";
	console.log(req.session.isLoggedIn);
	// console.log(
	// 	"IN this when you press login yo u have a user, so whenever you comeack to login opage console will show truer, otherwiasse undefined. BUT, if you change the browser and still login it will not becausetherer is no pprior knowledge of user"
	// );
	res.render("auth/login", {
		pageTitle: "Login",
		path: "/login",
		isAuthenticated: false,
	});
};

exports.postLogin = (req, res, next) => {
	// res.setHeader("Set-Cookie", "isloggedIn=true; ");
	req.session.isLoggedIn = true;
	res.redirect("/");
};

// res.setHeader("Set-Cookie", "isloggedIn=true; Max-Age=10"); => cookie live upto 10s only i.e. no is is seconds
// res.setHeader("Set-Cookie", "isloggedIn=true; Expires= "); => cookie live upto given date only { format can be searched }
// res.setHeader("Set-Cookie", "isloggedIn=true; Secure"); => cookie does not allow http server to acces coookie
// res.setHeader("Set-Cookie", "isloggedIn=true; HttpOnly"); => cookie omly allow http server to access coookie
