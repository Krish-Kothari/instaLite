const likesService = require("../services/likes.service");
const usersService = require("../services/users.service");
const postsService = require("../services/posts.service");
function id(value) { const n = Number(value); return Number.isInteger(n) && n > 0 ? n : null; }
async function create(req, res) {
  const userId = Number(req.body?.userId);
  const postId = id(req.params.id);
  if (req.body?.userId === undefined) return res.status(400).json({ error: "userId is required" });
  if (postId === null || !await postsService.getPostById(postId)) return res.status(404).json({ error: "Post not found" });
  if (!Number.isInteger(userId) || !await usersService.exists(userId)) return res.status(404).json({ error: "User not found" });
  try { return res.status(201).json(await likesService.createLike(userId, postId)); }
  catch (error) { if (error.code === "P2002") return res.status(409).json({ error: "Already liked" }); throw error; }
}
async function remove(req, res) {
  const userId = id(req.params.userId); const postId = id(req.params.id);
  if (postId === null || userId === null) return res.status(404).json({ error: "Like not found" });
  try { await likesService.deleteLike(userId, postId); return res.status(204).send(); }
  catch (error) { if (error.code === "P2025") return res.status(404).json({ error: "Like not found" }); throw error; }
}
module.exports = { create, remove };
