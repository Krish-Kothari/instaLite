const prisma = require("../db");

function createUser(data) { return prisma.user.create({ data }); }
function listUsers({ where, orderBy, skip, take }) {
  return prisma.$transaction([
    prisma.user.findMany({ where, orderBy, skip, take }),
    prisma.user.count({ where }),
  ]);
}
function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    include: { _count: { select: { posts: true, likes: true } } },
  });
}
function updateUser(id, data) { return prisma.user.update({ where: { id }, data }); }
function deleteUser(id) { return prisma.user.delete({ where: { id } }); }
function exists(id) { return prisma.user.findUnique({ where: { id }, select: { id: true } }); }

module.exports = { createUser, listUsers, getUserById, updateUser, deleteUser, exists };
