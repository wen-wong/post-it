const passport = require("passport");
const jwt = require("jsonwebtoken");

async function signUp(req, res, _next) {
	res.json({
		message: "Signup successful",
		user: req.user
	});
}

async function login(req, res, next) {
	passport.authenticate("login", async (err, user, _info) => {
		try {
			if (err || !user) {
				const error = new Error("An error occurred.");
				return next(error);
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, "TOP_SECRET");

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
}

module.exports = {
	signUp,
	login
};
