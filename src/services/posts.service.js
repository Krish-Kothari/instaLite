const prisma = require("../db");

const userSummary = { select: { id: true, username: true, fullname: true } };
const postRelations = {
  author: userSummary,
  _count: { select: { likes: true } },
};

function createPost(data) { return prisma.post.create({ data }); }
function listPosts({ where, orderBy, skip, take }) {
  return prisma.$transaction([
    prisma.post.findMany({ where, orderBy, skip, take, include: postRelations }),
    prisma.post.count({ where }),
  ]);
}
function getPostById(id) { return prisma.post.findUnique({ where: { id }, include: postRelations }); }
function updatePost(id, data) { return prisma.post.update({ where: { id }, data }); }
function deletePost(id) { return prisma.post.delete({ where: { id } }); }
function listUserPosts(authorId, skip, take) {
  const where = { authorId };
  return prisma.$transaction([
    prisma.post.findMany({
      where, orderBy: { createdAt: "desc" }, skip, take,
      include: { _count: { select: { likes: true } } },
    }),
    prisma.post.count({ where }),
  ]);
}
function listLikedPosts(userId, skip, take) {
  const where = { likes: { some: { userId } } };
  return prisma.$transaction([
    prisma.post.findMany({
      where, orderBy: { createdAt: "desc" }, skip, take, include: postRelations,
    }),
    prisma.post.count({ where }),
  ]);
}
function listPostLikes(postId) {
  return prisma.like.findMany({
    where: { postId }, orderBy: { user: { username: "asc" } },
    select: { user: userSummary },
  }).then((rows) => rows.map(({ user }) => user));
}

module.exports = {
  createPost, listPosts, getPostById, updatePost, deletePost,
  listUserPosts, listLikedPosts, listPostLikes,
};
