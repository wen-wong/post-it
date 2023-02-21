const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParse = require("body-parser");

require("dotenv").config();
require("./auth/auth");

const routes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const secureRoutes = require("./routes/secure.routes");

const app = express();
app.use(bodyParse.json());

// app.use(bodyParse.urlencoded({ extended: false }));

app.use("/", routes);
app.use("/post", passport.authenticate("jwt", { session: false }), postRoutes);
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoutes);

app.use(function (err, _req, res, _next) {
	console.log(err);
	res.status(err.status || 500);
	res.json({ error: err });
});

const databaseUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DBNAME}.mongodb.net/`;

mongoose.set({ strictQuery: false });
mongoose.connect(
	databaseUri,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	function (err, _res) {
		if (err) console.log(err);
		else {
			console.log("Connected");
		}
	}
);
app.listen(3000, () => console.log("Server started"));
