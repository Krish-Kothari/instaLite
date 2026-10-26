const postsService = require("../services/posts.service");
const usersService = require("../services/users.service");
const { pagination, meta } = require("../pagination");

function id(value) { const n = Number(value); return Number.isInteger(n) && n > 0 ? n : null; }
function errorResponse(res, error) {
  if (error.code === "P2025" || error.code === "P2003") return res.status(404).json({ error: "Post not found" });
  throw error;
}

async function create(req, res) {
  const { imageUrl, authorId, caption, location } = req.body || {};
  if (!imageUrl || authorId === undefined) return res.status(400).json({ error: "imageUrl and authorId are required" });
  if (!await usersService.exists(Number(authorId))) return res.status(404).json({ error: "User not found" });
  const post = await postsService.createPost({ imageUrl, authorId: Number(authorId), caption, location });
  return res.status(201).json(post);
}
async function list(req, res) {
  const pageInfo = pagination(req.query);
  if (pageInfo.error) return res.status(400).json({ error: pageInfo.error });
  const sortBy = req.query.sortBy || "createdAt";
  if (!["createdAt", "updatedAt", "likes"].includes(sortBy)) {
    return res.status(400).json({ error: "sortBy must be one of: createdAt, updatedAt, likes" });
  }
  const direction = req.query.order === "asc" ? "asc" : "desc";
  const where = {};
  if (req.query.search) where.OR = [
    { caption: { contains: req.query.search, mode: "insensitive" } },
    { location: { contains: req.query.search, mode: "insensitive" } },
  ];
  if (req.query.location) where.location = { contains: req.query.location, mode: "insensitive" };
  const orderBy = sortBy === "likes"
    ? [{ likes: { _count: direction } }, { createdAt: "desc" }]
    : { [sortBy]: direction };
  const [data, total] = await postsService.listPosts({ where, orderBy, skip: pageInfo.skip, take: pageInfo.take });
  return res.json({ data, meta: meta(pageInfo.page, pageInfo.limit, total) });
}
async function getOne(req, res) {
  const post = id(req.params.id) === null ? null : await postsService.getPostById(id(req.params.id));
  return post ? res.json(post) : res.status(404).json({ error: "Post not found" });
}
async function update(req, res) {
  const postId = id(req.params.id);
  if (postId === null) return res.status(404).json({ error: "Post not found" });
  try { return res.json(await postsService.updatePost(postId, Object.fromEntries(["caption", "location"].filter((key) => key in (req.body || {})).map((key) => [key, req.body[key]])))); }
  catch (error) { return errorResponse(res, error); }
}
async function remove(req, res) {
  const postId = id(req.params.id);
  if (postId === null) return res.status(404).json({ error: "Post not found" });
  try { await postsService.deletePost(postId); return res.status(204).send(); }
  catch (error) { return errorResponse(res, error); }
}
async function userPosts(req, res) {
  const userId = id(req.params.id);
  if (userId === null || !await usersService.exists(userId)) return res.status(404).json({ error: "User not found" });
  const p = pagination(req.query);
  if (p.error) return res.status(400).json({ error: p.error });
  const [data, total] = await postsService.listUserPosts(userId, p.skip, p.take);
  return res.json({ data, meta: meta(p.page, p.limit, total) });
}
async function likes(req, res) {
  const postId = id(req.params.id);
  if (postId === null || !await postsService.getPostById(postId)) return res.status(404).json({ error: "Post not found" });
  return res.json(await postsService.listPostLikes(postId));
}
async function likedPosts(req, res) {
  const userId = id(req.params.id);
  if (userId === null || !await usersService.exists(userId)) return res.status(404).json({ error: "User not found" });
  const p = pagination(req.query);
  if (p.error) return res.status(400).json({ error: p.error });
  const [data, total] = await postsService.listLikedPosts(userId, p.skip, p.take);
  return res.json({ data, meta: meta(p.page, p.limit, total) });
}
module.exports = { create, list, getOne, update, remove, userPosts, likes, likedPosts };
