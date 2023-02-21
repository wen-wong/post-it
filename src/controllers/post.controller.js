const PostModel = require("../model/post.model");

async function createPost(req, res, _next) {
	try {
		const { title, description, author } = await req.body;

		const post = await PostModel.create({
			title,
			description,
			author
		});
		return res.status(201).json({ post });
	} catch (error) {
		return res.status(500).json({ error });
	}
}

async function readPost(req, res, _next) {
	try {
		const postId = await req.params.id;
		const post = await PostModel.findById(postId);
		return res.status(201).json({ post });
	} catch (error) {
		return res.status(500).json({ error });
	}
}

async function readAllPosts(_req, res, _next) {
	try {
		const posts = await PostModel.find({});
		return res.status(200).json({ posts });
	} catch (error) {
		return res.status(500).json({ error });
	}
}

async function editPost(req, res, _next) {
	try {
		const postId = req.params.id;
		const post = await PostModel.findById(postId);
		if (post) {
			post.set(req.body);
			await post.save();
			return res.status(200).json({ post });
		}
		return res.status(404).json("Not found");
	} catch (error) {
		return res.status(500).json({ error });
	}
}

async function deletePost(req, res, _next) {
	try {
		const postId = req.params.id;
		const post = await PostModel.findById(postId);
		if (post) {
			post.delete();
			return res.status(200).json({ post });
		}
		return res.status(404).json("Not found");
	} catch (error) {
		return res.status(500).json({ error });
	}
}

module.exports = {
	createPost,
	readPost,
	readAllPosts,
	editPost,
	deletePost
};
