async function profile(req, res, _next) {
	res.json({
		message: "You made it to the secure route",
		user: req.user,
		token: req.query.secret_token
	});
}

module.exports = {
	profile
};
