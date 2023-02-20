const DEFAULT_LIMIT = 0;  // If 0 is used as limit in mongoose, it means all
const DEFAULT_PAGE = 1;

function getPagination(query) {
    const limit = Math.abs(query.limit);
    const page = Math.abs(query.page);

    const skip = (page - 1) * limit;

    return {
        skip,
        limit
    }
}

module.exports = {
    getPagination
}