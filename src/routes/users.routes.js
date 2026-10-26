const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router.post("/", usersController.create);
router.get("/", usersController.list);
router.get("/:id/posts", require("../controllers/posts.controller").userPosts);
router.get("/:id/liked-posts", require("../controllers/posts.controller").likedPosts);
router.get("/:id", usersController.getOne);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.remove);

module.exports = router;
