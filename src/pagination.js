function pagination(query) {
  const page = query.page === undefined ? 1 : Number(query.page);
  const limit = query.limit === undefined ? 10 : Number(query.limit);
  if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
    return { error: "page and limit must be positive integers" };
  }
  return { page, limit, skip: (page - 1) * limit, take: limit };
}

function meta(page, limit, total) {
  return { page, limit, total, totalPages: total === 0 ? 0 : Math.ceil(total / limit) };
}

module.exports = { pagination, meta };
