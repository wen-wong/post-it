const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.post("/create", postController.createPost);
router.get("/read", postController.readAllPosts);
router.get("/read/:id", postController.readPost);
router.patch("/edit/:id", postController.editPost);
router.delete("/delete/:id", postController.deletePost);

module.exports = router;
