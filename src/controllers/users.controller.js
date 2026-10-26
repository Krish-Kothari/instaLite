const usersService = require("../services/users.service");
const { pagination, meta } = require("../pagination");
function id(value) { const n = Number(value); return Number.isInteger(n) && n > 0 ? n : null; }
async function create(req, res) {
  const { username, email, fullname, bio } = req.body || {};
  if (!username || !email || !fullname) return res.status(400).json({ error: "username, email and fullname are required" });
  try { return res.status(201).json(await usersService.createUser({ username, email, fullname, bio })); }
  catch (error) { if (error.code === "P2002") return res.status(409).json({ error: "username or email already taken" }); throw error; }
}
async function list(req, res) {
  const p = pagination(req.query);
  if (p.error) return res.status(400).json({ error: p.error });
  const where = {};
  if (req.query.search) where.OR = [
    { username: { contains: req.query.search, mode: "insensitive" } },
    { fullname: { contains: req.query.search, mode: "insensitive" } },
  ];
  if (req.query.isPrivate !== undefined) {
    if (!["true", "false"].includes(req.query.isPrivate)) return res.status(400).json({ error: "isPrivate must be true or false" });
    where.isPrivate = req.query.isPrivate === "true";
  }
  if (req.query.hasPosts !== undefined) {
    if (!["true", "false"].includes(req.query.hasPosts)) return res.status(400).json({ error: "hasPosts must be true or false" });
    where.posts = req.query.hasPosts === "true" ? { some: {} } : { none: {} };
  }
  const orderBy = req.query.sortBy === "username" ? { username: req.query.order === "asc" ? "asc" : "desc" } : { createdAt: req.query.order === "asc" ? "asc" : "desc" };
  const [data, total] = await usersService.listUsers({ where, orderBy, skip: p.skip, take: p.take });
  return res.json({ data, meta: meta(p.page, p.limit, total) });
}
async function getOne(req, res) {
  const user = id(req.params.id) === null ? null : await usersService.getUserById(id(req.params.id));
  return user ? res.json(user) : res.status(404).json({ error: "User not found" });
}
async function update(req, res) {
  const userId = id(req.params.id);
  if (userId === null) return res.status(404).json({ error: "User not found" });
  try { return res.json(await usersService.updateUser(userId, Object.fromEntries(["fullname", "bio", "isPrivate"].filter((key) => key in (req.body || {})).map((key) => [key, req.body[key]])))); }
  catch (error) { if (error.code === "P2025") return res.status(404).json({ error: "User not found" }); throw error; }
}
async function remove(req, res) {
  const userId = id(req.params.id);
  if (userId === null) return res.status(404).json({ error: "User not found" });
  try { await usersService.deleteUser(userId); return res.status(204).send(); }
  catch (error) { if (error.code === "P2025") return res.status(404).json({ error: "User not found" }); throw error; }
}
module.exports = { create, list, getOne, update, remove };
