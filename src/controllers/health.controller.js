async function ping(_req, res, _next) {
	res.json("pong");
}

module.exports = {
	ping
};
